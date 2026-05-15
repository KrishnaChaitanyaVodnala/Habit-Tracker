export default function StatCard({ label, value, icon, sub, color = 'var(--teal)', delay = 0 }) {
  return (
    <div className="glass-card fade-in-up" style={{ padding: '20px 24px', animationDelay: `${delay}s`, opacity: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
          <p className="font-mono" style={{ fontSize: '2rem', fontWeight: 700, color, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{sub}</p>}
        </div>
        {icon && (
          <div style={{ padding: 10, borderRadius: 10, background: `${color}18`, fontSize: '1.4rem', lineHeight: 1 }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
