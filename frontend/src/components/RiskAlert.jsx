const RISK_STYLE = {
  high: { color: '#FF4D6D', bg: 'rgba(255,77,109,0.06)', icon: '🚨' },
  medium: { color: '#FFB347', bg: 'rgba(255,179,71,0.06)', icon: '⚠️' },
  low: { color: '#00D4AA', bg: 'rgba(0,212,170,0.06)', icon: '✅' },
};

export default function RiskAlert({ risk, delay = 0 }) {
  const s = RISK_STYLE[risk.riskLevel] || RISK_STYLE.low;
  return (
    <div className={`glass-card risk-${risk.riskLevel} fade-in-up`} style={{
      padding: '16px 20px', background: s.bg, animationDelay: `${delay}s`, opacity: 0
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{s.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, color: s.color, fontSize: '0.9rem' }}>{risk.habit}</span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20,
              background: `${s.color}20`, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              {risk.riskLevel} risk
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6 }}>{risk.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
