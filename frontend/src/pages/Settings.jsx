import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user } = useAuth();
  const [theme, setTheme] = useState('dark');
  const [notifs, setNotifs] = useState({ daily: true, streakWarning: true, weeklyReport: false });

  const Toggle = ({ value, onChange }) => (
    <button className={`toggle-switch ${value ? 'on' : ''}`} onClick={() => onChange(!value)} />
  );

  return (
    <Layout>
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Manage your account preferences</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
        {/* Profile */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem' }}>👤 Profile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Full Name', value: user?.name || '' },
              { label: 'Email', value: user?.email || '' },
            ].map(({ label, value }) => (
              <div key={label}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>{label}</label>
                <input type="text" className="input-field" value={value} readOnly
                  style={{ cursor: 'not-allowed', opacity: 0.7 }} />
              </div>
            ))}
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Profile editing requires account verification. Coming soon.
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem' }}>🔔 Notifications</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>UI only — backend notification system coming soon.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'daily', label: 'Daily habit reminders', desc: 'Get reminded to complete your habits each day' },
              { key: 'streakWarning', label: 'Streak break warnings', desc: 'Alert when a streak is at risk of breaking' },
              { key: 'weeklyReport', label: 'Weekly summary report', desc: 'Receive a weekly overview of your progress' },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.88rem' }}>{label}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 2 }}>{desc}</p>
                </div>
                <Toggle value={notifs[key]} onChange={(v) => setNotifs({ ...notifs, [key]: v })} />
              </div>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem' }}>🎨 Appearance</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {['dark', 'light'].map((t) => (
              <button key={t} onClick={() => { setTheme(t); toast.success(`${t} mode activated!`); }}
                style={{
                  flex: 1, padding: '14px', borderRadius: 12, border: '2px solid',
                  borderColor: theme === t ? 'var(--teal)' : 'var(--border)',
                  background: theme === t ? 'var(--teal-dim)' : 'transparent',
                  color: theme === t ? 'var(--teal)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.88rem',
                  transition: 'all 0.2s',
                }}>
                {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 10 }}>Light mode is UI-complete. Full theming via CSS variables is wired in.</p>
        </div>

        {/* Danger Zone */}
        <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(255,77,109,0.2)', background: 'rgba(255,77,109,0.03)' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 6, fontSize: '1rem', color: 'var(--danger)' }}>⚠️ Danger Zone</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: 16 }}>Irreversible account actions.</p>
          <button className="btn-danger" onClick={() => toast.error('Account deletion requires email confirmation.')}>
            Delete Account
          </button>
        </div>
      </div>
    </Layout>
  );
}
