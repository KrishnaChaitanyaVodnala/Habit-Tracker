import { useState, useRef, useEffect } from 'react';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getColor(rate) {
  if (rate === 0) return 'rgba(255,255,255,0.04)';
  if (rate < 25) return 'rgba(0,212,170,0.15)';
  if (rate < 50) return 'rgba(0,212,170,0.35)';
  if (rate < 75) return 'rgba(0,212,170,0.6)';
  return '#00D4AA';
}

export default function HeatmapGrid({ data }) {
  const [tooltip, setTooltip] = useState(null);
  const tooltipRef = useRef(null);

  if (!data || data.length === 0) return (
    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>No data yet</div>
  );

  // Build week columns (each col = 7 days Sun→Sat)
  const weeks = [];
  let week = new Array(7).fill(null);
  const startDay = new Date(data[0].date).getDay();

  // Pad start
  for (let i = 0; i < startDay; i++) week[i] = null;
  let weekIdx = startDay;

  data.forEach((entry) => {
    const day = new Date(entry.date).getDay();
    week[day] = entry;
    if (day === 6) {
      weeks.push([...week]);
      week = new Array(7).fill(null);
    }
  });
  if (week.some((d) => d !== null)) weeks.push(week);

  // Month labels
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((w, wi) => {
    const firstEntry = w.find((d) => d !== null);
    if (firstEntry) {
      const m = new Date(firstEntry.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ wi, label: MONTHS[m] });
        lastMonth = m;
      }
    }
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      {/* Month Labels */}
      <div style={{ display: 'flex', marginLeft: 36, marginBottom: 4 }}>
        {weeks.map((_, wi) => {
          const ml = monthLabels.find((m) => m.wi === wi);
          return (
            <div key={wi} style={{ width: 14, marginRight: 3, fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {ml ? ml.label : ''}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        {/* Day Labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 6 }}>
          {DAYS.map((d, i) => (
            <div key={d} style={{ height: 14, fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: '14px', visibility: i % 2 === 0 ? 'visible' : 'hidden' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'flex', gap: 3, position: 'relative' }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((entry, di) => (
                <div
                  key={di}
                  className="heatmap-cell"
                  style={{
                    width: 14, height: 14,
                    background: entry ? getColor(entry.completionRate) : 'rgba(255,255,255,0.03)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!entry) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({ entry, x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {entry?.milestoneFire && !entry?.milestoneTrophy && (
                    <span style={{ position: 'absolute', top: -6, left: -2, fontSize: '0.65rem', pointerEvents: 'none' }}>🔥</span>
                  )}
                  {entry?.milestoneTrophy && (
                    <span style={{ position: 'absolute', top: -6, left: -2, fontSize: '0.65rem', pointerEvents: 'none' }}>🏆</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed', top: tooltip.y - 60, left: tooltip.x - 40,
          background: '#0F0F1A', border: '1px solid var(--border)',
          borderRadius: 8, padding: '8px 12px', zIndex: 1000,
          fontSize: '0.75rem', pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{tooltip.entry.date}</p>
          <p style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>
            {tooltip.entry.count}/{tooltip.entry.total} habits ({tooltip.entry.completionRate}%)
          </p>
          {tooltip.entry.milestoneFire && <p style={{ color: '#FFA726' }}>🔥 10-day streak active!</p>}
          {tooltip.entry.milestoneTrophy && <p style={{ color: '#FFD700' }}>🏆 30-day milestone!</p>}
        </div>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Less</span>
        {[0, 25, 50, 75, 100].map((r) => (
          <div key={r} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(r) }} />
        ))}
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>More</span>
      </div>
    </div>
  );
}
