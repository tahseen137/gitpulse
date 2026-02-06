'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface LanguageData {
  name: string;
  count: number;
}

interface LanguageChartProps {
  data: LanguageData[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function LanguageChart({ data }: LanguageChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No language data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#fff'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
