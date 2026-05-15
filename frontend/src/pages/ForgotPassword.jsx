import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Reset link sent to your email! 📧');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }} className="grid-overlay">
      <div className="glass-card fade-in-up" style={{ width: '100%', maxWidth: 400, padding: '40px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00D4AA, #00B894)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={18} color="#0A0A0F" />
          </div>
          <span style={{ fontWeight: 700 }}>HabitFlow <span style={{ color: 'var(--teal)' }}>AI</span></span>
        </div>

        {!sent ? (
          <>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Reset password</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>
              Enter your email and we'll send a reset link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Email</label>
                <input
                  type="email" className="input-field"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                />
              </div>
              <button type="submit" className="btn-teal" style={{ padding: '13px', fontSize: '0.95rem' }}>
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📧</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Check your inbox</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              We've sent a reset link to <strong style={{ color: 'var(--teal)' }}>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
          </div>
        )}

        <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 24, color: 'var(--text-secondary)', fontSize: '0.84rem', textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
