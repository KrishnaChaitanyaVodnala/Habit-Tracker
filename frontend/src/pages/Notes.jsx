import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getHabits } from '../api/habits';
import { Plus, Trash2 } from 'lucide-react';

const CAT_CLASS = { health: 'cat-health', fitness: 'cat-fitness', learning: 'cat-learning', mindfulness: 'cat-mindfulness' };

export default function Notes() {
  const [habits, setHabits] = useState([]);
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hf_notes')) || {}; } catch { return {}; }
  });
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteEntries, setNoteEntries] = useState([]);

  useEffect(() => {
    getHabits().then(setHabits).catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem('hf_notes', JSON.stringify(notes));
  }, [notes]);

  const selectHabit = (habit) => {
    setSelectedHabit(habit);
    setNoteEntries(notes[habit.id] || []);
    setNoteText('');
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    const entry = { id: Date.now(), text: noteText.trim(), createdAt: new Date().toISOString() };
    const updated = [entry, ...noteEntries];
    setNoteEntries(updated);
    setNotes({ ...notes, [selectedHabit.id]: updated });
    setNoteText('');
  };

  const deleteNote = (noteId) => {
    const updated = noteEntries.filter((n) => n.id !== noteId);
    setNoteEntries(updated);
    setNotes({ ...notes, [selectedHabit.id]: updated });
  };

  return (
    <Layout>
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Notes</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Personal notes per habit. Saved locally.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Habit List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Select Habit</p>
          {habits.map((h) => (
            <button key={h.id} onClick={() => selectHabit(h)}
              className={selectedHabit?.id === h.id ? '' : ''}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 12, textAlign: 'left',
                border: '1px solid', cursor: 'pointer', fontFamily: 'var(--font-ui)', transition: 'all 0.2s',
                borderColor: selectedHabit?.id === h.id ? 'var(--teal)' : 'var(--border)',
                background: selectedHabit?.id === h.id ? 'var(--teal-dim)' : 'var(--bg-card)',
                color: 'var(--text-primary)',
              }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 4 }}>{h.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={`category-badge ${CAT_CLASS[h.category] || 'cat-health'}`}>{h.category}</span>
                {notes[h.id]?.length > 0 && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{notes[h.id].length} notes</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Note Editor */}
        <div>
          {!selectedHabit ? (
            <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>📝</div>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Select a habit</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Choose a habit from the left to view and add notes.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="glass-card" style={{ padding: 20 }}>
                <h2 style={{ fontWeight: 700, marginBottom: 12, fontSize: '1rem' }}>📝 {selectedHabit.name}</h2>
                <textarea
                  className="input-field"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write a note, reflection, or observation..."
                  rows={4}
                  style={{ resize: 'vertical', marginBottom: 12 }}
                  onKeyDown={(e) => { if (e.ctrlKey && e.key === 'Enter') addNote(); }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ctrl+Enter to save</span>
                  <button onClick={addNote} className="btn-teal" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Plus size={15} /> Add Note
                  </button>
                </div>
              </div>

              {noteEntries.length === 0 ? (
                <div className="glass-card" style={{ padding: 28, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  No notes yet. Write your first reflection above.
                </div>
              ) : (
                noteEntries.map((note) => (
                  <div key={note.id} className="glass-card note-card" style={{ padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                      <button onClick={() => deleteNote(note.id)} className="btn-danger" style={{ padding: '3px 8px' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{note.text}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
