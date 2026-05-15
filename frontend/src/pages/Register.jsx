import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { register as apiRegister } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { token, user } = await apiRegister(form.name, form.email, form.password);
      login(token, user);
      toast.success(`Welcome to HabitFlow, ${user.name}! 🚀`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }} className="grid-overlay">
      <div className="glass-card fade-in-up" style={{ width: '100%', maxWidth: 420, padding: '40px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00D4AA, #00B894)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={18} color="#0A0A0F" />
          </div>
          <span style={{ fontWeight: 700 }}>HabitFlow <span style={{ color: 'var(--teal)' }}>AI</span></span>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Create account</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>Start your habit journey today</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Alex Rivera' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 6 characters' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>{label}</label>
              <input
                type={type}
                className="input-field"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn-teal" disabled={loading} style={{ marginTop: 8, padding: '13px', fontSize: '0.95rem' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
