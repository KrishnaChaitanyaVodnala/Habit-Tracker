export default function StreakBadge({ streak, size = 'md' }) {
  if (!streak || streak === 0) return null;
  const sz = size === 'sm' ? { fontSize: '0.75rem', padding: '2px 8px' } : { fontSize: '0.85rem', padding: '4px 10px' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: 'rgba(255, 167, 38, 0.12)', border: '1px solid rgba(255, 167, 38, 0.25)',
      borderRadius: 20, color: '#FFA726', fontFamily: 'var(--font-mono)', fontWeight: 600, ...sz
    }}>
      <span className="streak-flame">🔥</span>
      {streak}
    </span>
  );
}
