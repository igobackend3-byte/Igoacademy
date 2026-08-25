/**
 * Admin Enquiries — Lead Management (requirement doc Section 8).
 * Lists website enquiry-form submissions with status filter/update.
 * Statuses: New -> Contacted -> Interested -> Follow-up -> Enrolled -> Not Interested -> Closed
 */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';

const STATUSES = ['New', 'Contacted', 'Interested', 'Follow-up', 'Enrolled', 'Not Interested', 'Closed'];

const STATUS_COLOR = {
  'New':             { bg: '#dbeafe', color: '#1d4ed8' },
  'Contacted':       { bg: '#fef3c7', color: '#b45309' },
  'Interested':      { bg: '#dcfce7', color: '#16a34a' },
  'Follow-up':       { bg: '#ede9fe', color: '#7c3aed' },
  'Enrolled':        { bg: '#dcfce7', color: '#15803d' },
  'Not Interested':  { bg: '#f3f4f6', color: '#6b7280' },
  'Closed':          { bg: '#f3f4f6', color: '#374151' },
};

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Enquiries() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-enquiries', statusFilter, search],
    queryFn: () => api.get('/enquiries', { params: { status: statusFilter || undefined, q: search || undefined } })
      .then(r => r.data.data),
  });

  const rows = data?.rows || [];
  const total = data?.total || 0;

  const updateMutation = useMutation({
    mutationFn: ({ id, status, admin_notes }) => api.put(`/enquiries/${id}/status`, { status, admin_notes }),
    onSuccess: () => {
      toast.success('Updated');
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-pending-counts'] });
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Update failed'),
  });

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: '1.5rem', color: '#0C2014', marginBottom: '.25rem' }}>
          Enquiries
        </h1>
        <p style={{ color: '#6b7280', fontSize: '.88rem' }}>{total} total — website lead-capture submissions</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
        <button
          onClick={() => setStatusFilter('')}
          className={statusFilter === '' ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}
          style={{ width: 'auto' }}
        >
          All
        </button>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '.4rem 1rem', borderRadius: 999, fontSize: '.8rem', fontWeight: 700, cursor: 'pointer',
              border: statusFilter === s ? 'none' : '1.5px solid var(--gray-200, #e5e7eb)',
              background: statusFilter === s ? (STATUS_COLOR[s]?.color || '#0C2014') : 'white',
              color: statusFilter === s ? 'white' : (STATUS_COLOR[s]?.color || '#374151'),
            }}
          >
            {s}
          </button>
        ))}
        <input
          placeholder="Search name / mobile / email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft: 'auto', padding: '.5rem .9rem', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '.85rem', minWidth: 220 }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No enquiries match this filter.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
              <thead>
                <tr style={{ background: '#F5F7F3', textAlign: 'left' }}>
                  {['Name', 'Mobile', 'Course Interest', 'Type', 'Mode', 'Status', 'Received', ''].map(h => (
                    <th key={h} style={{ padding: '.75rem 1rem', fontSize: '.72rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <FragmentRow
                    key={row.id}
                    row={row}
                    expanded={expandedId === row.id}
                    onToggle={() => setExpandedId(expandedId === row.id ? null : row.id)}
                    onUpdate={(patch) => updateMutation.mutate({ id: row.id, ...patch })}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FragmentRow({ row, expanded, onToggle, onUpdate }) {
  const [notes, setNotes] = useState(row.admin_notes || '');
  const sc = STATUS_COLOR[row.status] || { bg: '#f3f4f6', color: '#374151' };

  return (
    <>
      <tr style={{ borderTop: '1px solid #f0f0f0', cursor: 'pointer' }} onClick={onToggle}>
        <td style={{ padding: '.75rem 1rem', fontWeight: 700, color: '#0C2014' }}>{row.name}</td>
        <td style={{ padding: '.75rem 1rem' }}>{row.mobile}</td>
        <td style={{ padding: '.75rem 1rem' }}>{row.course_title || row.course_interest_text || '—'}</td>
        <td style={{ padding: '.75rem 1rem' }}>{row.candidate_type || '—'}</td>
        <td style={{ padding: '.75rem 1rem' }}>{row.preferred_mode || '—'}</td>
        <td style={{ padding: '.75rem 1rem' }}>
          <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.75rem' }}>
            {row.status}
          </span>
        </td>
        <td style={{ padding: '.75rem 1rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(row.created_at)}</td>
        <td style={{ padding: '.75rem 1rem', color: '#9ca3af' }}>{expanded ? '▲' : '▼'}</td>
      </tr>
      {expanded && (
        <tr style={{ background: '#FAFBF8' }}>
          <td colSpan={8} style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div><strong>Email:</strong> {row.email || '—'}</div>
              <div><strong>Location:</strong> {row.location || '—'}</div>
              <div><strong>Source:</strong> {row.source || '—'}</div>
              <div><strong>Landing page:</strong> {row.landing_page || '—'}</div>
            </div>
            {row.message && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Message:</strong>
                <p style={{ color: '#4C5B50', marginTop: 4 }}>{row.message}</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>Status</label>
                <select
                  value={row.status}
                  onChange={e => onUpdate({ status: e.target.value, admin_notes: notes })}
                  style={{ padding: '.5rem .75rem', borderRadius: 8, border: '1.5px solid #e5e7eb' }}
                  onClick={e => e.stopPropagation()}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>Notes</label>
                <input
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', padding: '.5rem .75rem', borderRadius: 8, border: '1.5px solid #e5e7eb', boxSizing: 'border-box' }}
                />
              </div>
              <button
                className="btn-primary btn-sm"
                style={{ width: 'auto' }}
                onClick={(e) => { e.stopPropagation(); onUpdate({ status: row.status, admin_notes: notes }); }}
              >
                Save Notes
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
