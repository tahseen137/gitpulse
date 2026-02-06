interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: 'green' | 'yellow' | 'blue' | 'purple';
}

const colorClasses = {
  green: 'text-green-500 bg-green-500/10 border-green-500/30',
  yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  blue: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  purple: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
};

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
