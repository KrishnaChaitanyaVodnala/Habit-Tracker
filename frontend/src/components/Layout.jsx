import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="grid-overlay" style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main className={`page-content ${collapsed ? 'sidebar-collapsed' : ''} page-in`}>
        {children}
      </main>
    </div>
  );
}
