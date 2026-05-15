import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HabitCard from '../components/HabitCard';
import { getHabits, createHabit, deleteHabit, updateHabit, trackHabit } from '../api/habits';
import { Plus, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['health', 'learning', 'mindfulness', 'fitness'];
const FREQUENCIES = ['daily', 'weekly', 'weekdays'];

const EMPTY_FORM = { name: '', category: 'health', frequency: 'daily' };

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchHabits = async () => {
    try { const data = await getHabits(); setHabits(data); }
    catch (e) { toast.error('Failed to load habits'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchHabits(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateHabit(editingId, form);
        toast.success('Habit updated!');
      } else {
        await createHabit(form);
        toast.success('Habit created! 🎯');
      }
      setForm(EMPTY_FORM); setEditingId(null); setShowForm(false);
      fetchHabits();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to save habit');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this habit and all its logs?')) return;
    try { await deleteHabit(id); toast.success('Habit deleted'); fetchHabits(); }
    catch (e) { toast.error('Failed to delete habit'); }
  };

  const handleEdit = (habit) => {
    setForm({ name: habit.name, category: habit.category, frequency: habit.frequency });
    setEditingId(habit.id); setShowForm(true);
  };

  const handleTrack = async (id) => {
    setChecking(id);
    try { await trackHabit(id); toast.success('Tracked! 🎉'); fetchHabits(); }
    catch (e) { toast.error(e.response?.data?.error || 'Already tracked today'); }
    finally { setChecking(null); }
  };

  const filtered = filter === 'all' ? habits : habits.filter((h) => h.category === filter);

  return (
    <Layout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }} className="fade-in-up">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Habits</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{habits.length} habits tracked</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY_FORM); }} className="btn-teal" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Habit</>}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass-card fade-in-up" style={{ padding: 24, marginBottom: 24, borderColor: 'var(--border-hover)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: 18 }}>{editingId ? 'Edit Habit' : 'New Habit'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 160px auto', gap: 12, alignItems: 'end' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Habit Name</label>
                <input type="text" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Morning Meditation" required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Category</label>
                <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Frequency</label>
                <select className="input-field" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}>
                  {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-teal" disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                <Save size={15} /> {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{
              padding: '6px 16px', borderRadius: 20, border: '1px solid', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
              borderColor: filter === cat ? 'var(--teal)' : 'var(--border)',
              background: filter === cat ? 'var(--teal-dim)' : 'transparent',
              color: filter === cat ? 'var(--teal)' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}>
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Habits List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 16 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🌱</div>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>No habits here yet</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Click "Add Habit" to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onTrack={handleTrack} onDelete={handleDelete} onEdit={handleEdit} checking={checking === habit.id} />
          ))}
        </div>
      )}
    </Layout>
  );
}
