import React from 'react';

const SimpleBarChart = ({ data = [], width = 600, height = 200, color = '#427FA8' }) => {
  const padding = 24;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = innerWidth / Math.max(data.length, 1);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <g transform={`translate(${padding},${padding})`}>
        {data.map((d, i) => {
          const h = (d.value / max) * innerHeight;
          const x = i * barWidth + 8;
          const w = Math.max(barWidth - 16, 6);
          const y = innerHeight - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx={4} fill={color} opacity={0.85} />
              <text x={x + w / 2} y={innerHeight + 14} fontSize={11} textAnchor="middle" fill="#333">
                {d.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default SimpleBarChart;
