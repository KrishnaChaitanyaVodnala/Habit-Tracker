import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeatmapGrid from '../components/HeatmapGrid';
import { getTimeline } from '../api/analytics';
import toast from 'react-hot-toast';

export default function Heatmap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimeline()
      .then(setData)
      .catch(() => toast.error('Failed to load heatmap'))
      .finally(() => setLoading(false));
  }, []);

  const totalDays = data.filter((d) => d.count > 0).length;
  const avgRate = data.length > 0 ? Math.round(data.reduce((s, d) => s + d.completionRate, 0) / data.length) : 0;

  return (
    <Layout>
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Calendar Heatmap</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Your habit consistency over the last 90 days</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { label: 'Active Days', value: totalDays, color: 'var(--teal)' },
          { label: 'Avg Completion', value: `${avgRate}%`, color: '#8888FF' },
          { label: 'Period', value: '90 days', color: 'var(--text-secondary)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card" style={{ padding: '14px 20px', flex: 1, minWidth: 140 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
            <p className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 700, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass-card" style={{ padding: 28 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 6, fontSize: '1rem' }}>Habit Activity</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24 }}>
          Each cell = one day. Color intensity = % of habits completed.
          🔥 = active 10-day streak · 🏆 = 30-day milestone
        </p>
        {loading ? (
          <div className="skeleton" style={{ height: 140, borderRadius: 8 }} />
        ) : (
          <HeatmapGrid data={data} />
        )}
      </div>
    </Layout>
  );
}
