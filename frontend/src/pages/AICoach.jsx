import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import InsightCard from '../components/InsightCard';
import RiskAlert from '../components/RiskAlert';
import { getCoach, getRiskAnalysis } from '../api/ai';
import toast from 'react-hot-toast';

function SkeletonCard() {
  return <div className="skeleton" style={{ height: 100, borderRadius: 16 }} />;
}

export default function AICoach() {
  const [insights, setInsights] = useState([]);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCoach(), getRiskAnalysis()])
      .then(([c, r]) => { setInsights(c); setRisks(r); })
      .catch(() => toast.error('Failed to load AI insights'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="fade-in-up" style={{ marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'var(--teal-dim)', border: '1px solid var(--border-hover)', borderRadius: 20, marginBottom: 14 }}>
          <span>🤖</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 600 }}>AI-Powered Analysis</span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>AI Coach</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
          Behavioral insights and streak predictions powered by pattern analysis.
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: 8 }}>// LLM integration ready</span>
        </p>
      </div>

      {/* Risk Alerts */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
          ⚠️ Risk Detection
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading ? [1,2].map(i => <SkeletonCard key={i} />) :
            risks.length === 0 ? (
              <div className="glass-card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
                🎉 No streaks at risk right now. Keep going!
              </div>
            ) : risks.map((r, i) => <RiskAlert key={i} risk={r} delay={i * 0.1} />)
          }
        </div>
      </div>

      {/* Behavioral Insights */}
      <div>
        <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
          🧠 Behavioral Insights
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading ? [1,2,3].map(i => <SkeletonCard key={i} />) :
            insights.length === 0 ? (
              <div className="glass-card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
                Start tracking habits to get personalized insights.
              </div>
            ) : insights.map((insight, i) => <InsightCard key={i} insight={insight} delay={i * 0.1} />)
          }
        </div>
      </div>

      {/* Scaffold Notice */}
      <div className="glass-card fade-in-up" style={{ padding: 20, marginTop: 32, borderColor: 'rgba(100,100,255,0.2)', background: 'rgba(100,100,255,0.04)' }}>
        <p style={{ fontSize: '0.82rem', color: '#8888FF', lineHeight: 1.6 }}>
          <strong>🚀 LLM-Ready:</strong> These insights are hardcoded mock data. Wire up any LLM provider (OpenAI, Gemini, Anthropic) by replacing the{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>
            /api/ai/*
          </code>
          {' '}handlers in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>backend/routes/ai.js</code>.
        </p>
      </div>
    </Layout>
  );
}
