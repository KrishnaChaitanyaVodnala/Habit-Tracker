const TYPE_STYLES = {
  pattern: { border: 'rgba(100,100,255,0.3)', bg: 'rgba(100,100,255,0.06)', icon: '📊', color: '#8888FF' },
  positive: { border: 'rgba(0,212,170,0.3)', bg: 'rgba(0,212,170,0.06)', icon: '✅', color: '#00D4AA' },
  suggestion: { border: 'rgba(255,200,100,0.3)', bg: 'rgba(255,200,100,0.06)', icon: '💡', color: '#FFC864' },
};

export default function InsightCard({ insight, delay = 0 }) {
  const s = TYPE_STYLES[insight.type] || TYPE_STYLES.suggestion;
  return (
    <div className="glass-card fade-in-up" style={{
      padding: '18px 20px', borderLeft: `3px solid ${s.border.replace('0.3', '1')}`,
      background: s.bg, animationDelay: `${delay}s`, opacity: 0
    }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
        <div>
          <p style={{ fontWeight: 700, color: s.color, marginBottom: 6, fontSize: '0.9rem' }}>{insight.title}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{insight.message}</p>
        </div>
      </div>
    </div>
  );
}
