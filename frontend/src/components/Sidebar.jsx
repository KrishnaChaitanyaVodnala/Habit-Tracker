import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, ListChecks, BarChart2, Grid3X3,
  BrainCircuit, Settings, StickyNote, LogOut, Flame, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Habits', icon: ListChecks, path: '/habits' },
  { label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { label: 'Heatmap', icon: Grid3X3, path: '/heatmap' },
  { label: 'AI Coach', icon: BrainCircuit, path: '/ai-coach' },
  { label: 'Notes', icon: StickyNote, path: '/notes' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00D4AA, #00B894)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Flame size={18} color="#0A0A0F" />
          </div>
          {!collapsed && (
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              HabitFlow <span style={{ color: 'var(--teal)' }}>AI</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV.map(({ label, icon: Icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`sidebar-link ${pathname === path ? 'active' : ''}`}
            title={collapsed ? label : undefined}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border)' }}>
        {!collapsed && user && (
          <div style={{ padding: '8px 6px 12px', overflow: 'hidden' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="sidebar-link"
          style={{ color: 'var(--danger)', justifyContent: collapsed ? 'center' : 'flex-start' }}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="sidebar-link"
          style={{ marginTop: 4, justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
