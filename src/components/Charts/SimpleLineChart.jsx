import React from 'react';

const SimpleLineChart = ({ data = [], width = 600, height = 200, color = '#CE746B' }) => {
  const padding = 16;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const max = Math.max(...data.map(d => d.value), 1);

  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * innerWidth + padding;
    const y = innerHeight - (d.value / max) * innerHeight + padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <polyline fill="none" stroke={color} strokeWidth={3} points={points} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * innerWidth + padding;
        const y = innerHeight - (d.value / max) * innerHeight + padding;
        return <circle key={i} cx={x} cy={y} r={4} fill={color} />;
      })}
    </svg>
  );
};

export default SimpleLineChart;
