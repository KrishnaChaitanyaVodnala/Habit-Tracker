import { useState } from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import StreakBadge from './StreakBadge';

const CAT_CLASS = {
  health: 'cat-health',
  fitness: 'cat-fitness',
  learning: 'cat-learning',
  mindfulness: 'cat-mindfulness',
};

const CAT_ICON = { health: '💧', fitness: '🏃', learning: '📚', mindfulness: '🧘' };

export default function HabitCard({ habit, onTrack, onDelete, onEdit, checking }) {
  const [popping, setPopping] = useState(false);

  const handleTrack = async () => {
    if (habit.completedToday || checking) return;
    setPopping(true);
    await onTrack(habit.id);
    setTimeout(() => setPopping(false), 400);
  };

  return (
    <div className="glass-card" style={{
      padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
      borderLeft: habit.completedToday ? '3px solid var(--teal)' : '3px solid transparent',
      opacity: habit.completedToday ? 0.8 : 1,
    }}>
      {/* Check Button */}
      <button
        onClick={handleTrack}
        disabled={habit.completedToday || checking}
        className={popping ? 'check-pop' : ''}
        style={{
          width: 38, height: 38, borderRadius: '50%', border: habit.completedToday ? 'none' : '2px solid var(--border)',
          background: habit.completedToday ? 'linear-gradient(135deg, #00D4AA, #00B894)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: habit.completedToday ? 'default' : 'pointer',
          transition: 'all 0.2s ease', flexShrink: 0,
        }}
      >
        {habit.completedToday && <Check size={18} color="#0A0A0F" strokeWidth={3} />}
      </button>

      {/* Habit Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {CAT_ICON[habit.category] || '✨'} {habit.name}
          </span>
          <span className={`category-badge ${CAT_CLASS[habit.category] || 'cat-health'}`}>
            {habit.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <StreakBadge streak={habit.streak} size="sm" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {habit.frequency} • {habit.totalLogs || 0} total completions
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {onEdit && (
          <button onClick={() => onEdit(habit)} className="btn-ghost"
            style={{ padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
            <Edit2 size={14} />
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(habit.id)} className="btn-danger"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
