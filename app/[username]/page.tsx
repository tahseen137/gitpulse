'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Activity, TrendingUp, GitFork, Star, Calendar, Zap, Loader2 } from 'lucide-react';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import LanguageChart from '@/components/LanguageChart';
import ActivityFeed from '@/components/ActivityFeed';
import StatCard from '@/components/StatCard';

interface DashboardData {
  user: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
  };
  stats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    mostActiveRepo: string;
  };
  topLanguages: Array<{ name: string; count: number }>;
  contributions: Array<{ date: string; count: number }>;
  streak: number;
  recentActivity: Array<{
    type: string;
    repo: string;
    createdAt: string;
    details: string;
  }>;
  productivityScore: number;
}

export default function DashboardPage() {
  const params = useParams();
  const username = params.username as string;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/github/${username}`);
        if (!res.ok) {
          throw new Error('User not found');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">User Not Found</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link
            href="/"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-500">
            GitPulse
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            Upgrade to Pro
          </Link>
        </div>
      </header>

      {/* User Profile Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={data.user.avatar}
              alt={data.user.name}
              className="w-24 h-24 rounded-full border-4 border-green-500/30"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{data.user.name}</h1>
              <p className="text-gray-400 text-lg mb-2">@{data.user.username}</p>
              {data.user.bio && <p className="text-gray-300 mb-4">{data.user.bio}</p>}
              <div className="flex gap-6 text-sm">
                <span className="text-gray-400">
                  <strong className="text-white">{data.user.followers}</strong> followers
                </span>
                <span className="text-gray-400">
                  <strong className="text-white">{data.user.following}</strong> following
                </span>
                <span className="text-gray-400">
                  <strong className="text-white">{data.user.publicRepos}</strong> repositories
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-green-500 mb-2">
                {data.productivityScore}
              </div>
              <p className="text-gray-400 text-sm">Productivity Score</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Current Streak"
            value={`${data.streak} days`}
            color="green"
          />
          <StatCard
            icon={<Star className="w-6 h-6" />}
            label="Total Stars"
            value={data.stats.totalStars}
            color="yellow"
          />
          <StatCard
            icon={<GitFork className="w-6 h-6" />}
            label="Total Forks"
            value={data.stats.totalForks}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Repositories"
            value={data.stats.totalRepos}
            color="purple"
          />
        </div>

        {/* Contribution Heatmap */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-500" />
            Contribution Activity
          </h2>
          <ContributionHeatmap data={data.contributions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Languages Chart */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-500" />
              Top Languages
            </h2>
            <LanguageChart data={data.topLanguages} />
          </div>

          {/* Repository Stats */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Repository Highlights</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Most Active Repository</p>
                <p className="text-xl font-semibold text-green-500">
                  {data.stats.mostActiveRepo}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Contributions (30 days)</p>
                <p className="text-xl font-semibold">
                  {data.contributions.slice(-30).reduce((acc, day) => acc + day.count, 0)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Average per Day</p>
                <p className="text-xl font-semibold">
                  {(
                    data.contributions.slice(-30).reduce((acc, day) => acc + day.count, 0) / 30
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-500" />
            Recent Activity
          </h2>
          <ActivityFeed data={data.recentActivity} />
        </div>
      </div>
    </div>
  );
}
