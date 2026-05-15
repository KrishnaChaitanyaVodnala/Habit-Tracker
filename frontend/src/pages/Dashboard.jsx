import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import HabitCard from '../components/HabitCard';
import { getDashboard, trackHabit } from '../api/habits';
import { getMotivation } from '../api/ai';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [checking, setChecking] = useState(null);
  const [loading, setLoading] = useState(true);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const fetchDashboard = async () => {
    try {
      const [dash, mot] = await Promise.all([getDashboard(), getMotivation()]);
      setData(dash);
      setMotivation(mot);
    } catch (err) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleTrack = async (habitId) => {
    setChecking(habitId);
    try {
      await trackHabit(habitId);
      toast.success('Habit tracked! 🎉');
      await fetchDashboard();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Already tracked today');
    } finally {
      setChecking(null);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />)}
      </div>
    </Layout>
  );

  return (
    <Layout>
      {/* Header */}
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 4 }}>{today}</p>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          {greeting()}, <span style={{ color: 'var(--teal)' }}>{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Here's your habit overview for today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Habits" value={data?.todayStats?.total || 0} icon="📋" delay={0} />
        <StatCard label="Completed Today" value={data?.todayStats?.completed || 0} icon="✅" color="#00D4AA" delay={0.05} />
        <StatCard label="Completion Rate" value={`${data?.todayStats?.completionRate || 0}%`} icon="📈" delay={0.1} />
        <StatCard label="Longest Streak" value={data?.longestStreak || 0} icon="🔥" color="#FFA726" delay={0.15} />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Habits List */}
        <div>
          <h2 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Today's Habits
          </h2>
          {data?.habits?.length === 0 ? (
            <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🌱</div>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>No habits yet</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Head to the Habits page to create your first habit.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data?.habits?.map((habit) => (
                <HabitCard key={habit.id} habit={habit} onTrack={handleTrack} checking={checking === habit.id} />
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Progress Ring */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <h3 style={{ fontWeight: 600, marginBottom: 20, fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Today's Progress
            </h3>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="48" fill="none"
                  stroke="#00D4AA" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(data?.todayStats?.completionRate || 0) / 100 * 301.6} 301.6`}
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--teal)' }}>
                  {data?.todayStats?.completionRate || 0}%
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {data?.todayStats?.completed}/{data?.todayStats?.total} habits done
            </p>
          </div>

          {/* AI Motivation */}
          {motivation && (
            <div className="glass-card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(0,212,170,0.06), rgba(0,184,148,0.03))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: '1rem' }}>🤖</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Coach</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>
                "{motivation.quote}"
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                💡 {motivation.tip}
              </p>
            </div>
          )}

          {/* Top Streaks */}
          <div className="glass-card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 600, marginBottom: 14, fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Top Streaks
            </h3>
            {data?.habits
              ?.filter((h) => h.streak > 0)
              .sort((a, b) => b.streak - a.streak)
              .slice(0, 4)
              .map((h) => (
                <div key={h.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>{h.name}</span>
                  <span className="font-mono" style={{ color: '#FFA726', fontSize: '0.84rem', fontWeight: 600 }}>🔥 {h.streak}</span>
                </div>
              ))
            }
            {(!data?.habits || data.habits.every(h => h.streak === 0)) && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Start tracking to build streaks!</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
