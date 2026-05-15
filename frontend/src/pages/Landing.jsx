import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Brain, Shield, ChevronRight, Check } from 'lucide-react';

const FEATURES = [
  { icon: '🔥', title: 'Streak Tracking', desc: 'Build unbreakable habits with daily streak counters and visual momentum.' },
  { icon: '🧠', title: 'AI Coach', desc: 'Personalized behavioral insights powered by pattern recognition.' },
  { icon: '📊', title: 'Calendar Heatmap', desc: 'GitHub-style contribution grid showing your consistency over time.' },
  { icon: '⚠️', title: 'Risk Detection', desc: 'Predict and prevent streak breaks before they happen.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 2847;
    const step = Math.ceil(target / 80);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(cur);
      if (cur >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} className="grid-overlay">
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #00D4AA, #00B894)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Flame size={18} color="#0A0A0F" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
            HabitFlow <span style={{ color: 'var(--teal)' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/login')} className="btn-ghost">Sign In</button>
          <button onClick={() => navigate('/register')} className="btn-teal">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 48px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
          background: 'var(--teal-dim)', border: '1px solid var(--border-hover)',
          borderRadius: 20, marginBottom: 28, fontSize: '0.82rem', color: 'var(--teal)',
        }}>
          <span className="streak-flame">🔥</span>
          <span>AI-Powered Habit Intelligence</span>
        </div>

        <h1 className="fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          Build Habits That<br />
          <span style={{ background: 'linear-gradient(135deg, #00D4AA, #00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Actually Stick
          </span>
        </h1>

        <p className="fade-in-up-1" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          HabitFlow AI combines streak psychology, behavioral analysis, and AI coaching
          to make habit-building effortless and measurable.
        </p>

        <div className="fade-in-up-2" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button onClick={() => navigate('/register')} className="btn-teal" style={{ fontSize: '1rem', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
            Start for Free <ChevronRight size={18} />
          </button>
          <button onClick={() => navigate('/login')} className="btn-ghost" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Try Demo →
          </button>
        </div>

        {/* Animated Counter */}
        <div className="fade-in-up-3 float-anim glass-card" style={{ display: 'inline-block', padding: '28px 48px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Active Habit Streaks Today
          </p>
          <p className="font-mono counter-pulse" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
            {count.toLocaleString()}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>🌍 across all users</p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 48px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          Why HabitFlow
        </p>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: 48 }}>
          Everything you need to build momentum
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="glass-card fade-in-up" style={{ padding: '28px 24px', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 10, fontSize: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '80px 48px',
        background: 'linear-gradient(180deg, transparent, rgba(0,212,170,0.04))',
        borderTop: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>Ready to build your best self?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Join thousands already tracking with HabitFlow AI.</p>
        <button onClick={() => navigate('/register')} className="btn-teal" style={{ fontSize: '1rem', padding: '14px 40px' }}>
          Get Started — It's Free
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 48px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        © 2024 HabitFlow AI — Built with 🔥 and behavioral science
      </footer>
    </div>
  );
}
