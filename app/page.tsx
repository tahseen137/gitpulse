'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Activity, TrendingUp, Zap, Calendar, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-green-500">GitPulse</div>
          <Link
            href="/pricing"
            className="px-4 py-2 hover:bg-gray-800 rounded-lg transition"
          >
            Pricing
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-sm mb-8">
          <Zap className="w-4 h-4" />
          <span>GitHub Wrapped, but live and always up-to-date</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Track Your GitHub
          <br />
          Activity in Real-Time
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Get beautiful insights into your coding activity, contribution streaks, and productivity metrics.
          Perfect for developers who want to showcase their work.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
          <div className="glass-card rounded-xl p-2 flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition flex items-center gap-2"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Try: octocat, torvalds, or any GitHub username
          </p>
        </form>

        {/* Demo Screenshot Placeholder */}
        <div className="glass-card rounded-2xl p-4 max-w-5xl mx-auto mb-20">
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything you need to track your progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Activity className="w-8 h-8" />}
            title="Contribution Heatmap"
            description="Visualize your entire year of contributions at a glance with our beautiful heatmap."
            color="green"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Streak Counter"
            description="Track your current coding streak and stay motivated to code every day."
            color="blue"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Productivity Score"
            description="Get a personalized score based on your commit frequency and PR activity."
            color="purple"
          />
          <FeatureCard
            icon={<Star className="w-8 h-8" />}
            title="Language Analytics"
            description="See which programming languages you use most across your repositories."
            color="yellow"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Real-Time Activity"
            description="View your latest commits, PRs, and issues in a beautiful activity feed."
            color="green"
          />
          <FeatureCard
            icon={<Activity className="w-8 h-8" />}
            title="Repository Stats"
            description="Track stars, forks, and find your most active repositories."
            color="blue"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="glass-card rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to see your stats?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Enter any GitHub username and get instant insights
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="glass-card rounded-xl p-2 flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="GitHub username"
                className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>Built with Next.js, Tailwind CSS, and GitHub API</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'green' | 'blue' | 'purple' | 'yellow';
}

const colorClasses = {
  green: 'text-green-500 bg-green-500/10 border-green-500/30',
  blue: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  purple: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
  yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
};

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="glass-card rounded-xl p-8 hover:scale-105 transition-transform">
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
