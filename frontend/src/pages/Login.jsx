import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Eye, EyeOff } from 'lucide-react';
import { login as apiLogin } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'demo@habitflow.ai', password: 'demo1234' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await apiLogin(form.email, form.password);
      login(token, user);
      toast.success(`Welcome back, ${user.name}! 🔥`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', padding: 24,
    }} className="grid-overlay">
      <div className="glass-card fade-in-up" style={{ width: '100%', maxWidth: 420, padding: '40px 36px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00D4AA, #00B894)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={18} color="#0A0A0F" />
          </div>
          <span style={{ fontWeight: 700 }}>HabitFlow <span style={{ color: 'var(--teal)' }}>AI</span></span>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Welcome back</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>Sign in to your account</p>

        {/* Demo hint */}
        <div style={{ background: 'var(--teal-dim)', border: '1px solid var(--border-hover)', borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontSize: '0.8rem', color: 'var(--teal)' }}>
          🎯 Demo pre-filled — just click Sign In
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.78rem', color: 'var(--teal)', textDecoration: 'none' }}>Forgot password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-teal" disabled={loading} style={{ marginTop: 8, padding: '13px', fontSize: '0.95rem' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          No account? <Link to="/register" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
