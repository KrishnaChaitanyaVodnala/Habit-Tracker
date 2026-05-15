import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getTimeline } from '../api/analytics';
import { getHabits } from '../api/habits';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import toast from 'react-hot-toast';

const TEAL_COLORS = ['#00D4AA', '#00B894', '#009B77', '#007D5E', '#005C45'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0F0F1A', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          {p.name}: {p.value}{p.name.includes('Rate') ? '%' : ''}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [timeline, setTimeline] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTimeline(), getHabits()])
      .then(([tl, h]) => { setTimeline(tl); setHabits(h); })
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  // Weekly bar chart data — last 7 days
  const last7 = timeline.slice(-7).map((d) => ({
    day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    Completed: d.count,
    Rate: d.completionRate,
  }));

  // Habit-wise completion rate (donut-style radial)
  const habitRadial = habits.slice(0, 5).map((h, i) => ({
    name: h.name.length > 18 ? h.name.slice(0, 16) + '…' : h.name,
    value: Math.round((h.totalLogs / Math.max(timeline.filter(d => d.count > 0).length, 1)) * 100),
    fill: TEAL_COLORS[i],
  }));

  // 30-day streak history line chart
  const streakLine = timeline.slice(-30).map((d) => ({
    date: d.date.slice(5),
    completionRate: d.completionRate,
  }));

  if (loading) return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 300, borderRadius: 16 }} />)}
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Your habit performance over time</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Weekly Bar Chart */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 4, fontSize: '1rem' }}>Weekly Completion</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24 }}>Habits completed per day this week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={last7}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Completed" fill="#00D4AA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Two-column: Radial + Line */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Habit-wise radial */}
          <div className="glass-card" style={{ padding: 28 }}>
            <h2 style={{ fontWeight: 700, marginBottom: 4, fontSize: '1rem' }}>Habit Completion Rates</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24 }}>Average daily completion per habit</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart innerRadius="30%" outerRadius="90%" data={habitRadial} startAngle={90} endAngle={-270}>
                <RadialBar minAngle={5} background={{ fill: 'rgba(255,255,255,0.04)' }} dataKey="value" cornerRadius={4} />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right"
                  formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{v}</span>}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* 30-day Line Chart */}
          <div className="glass-card" style={{ padding: 28 }}>
            <h2 style={{ fontWeight: 700, marginBottom: 4, fontSize: '1rem' }}>30-Day Trend</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24 }}>Overall daily completion rate (%)</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={streakLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} interval={5} />
                <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone" dataKey="completionRate" name="Rate"
                  stroke="#00D4AA" strokeWidth={2} dot={false}
                  activeDot={{ r: 5, fill: '#00D4AA', stroke: '#0A0A0F', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
