'use client';

import { formatDistanceToNow } from 'date-fns';
import { GitCommit, GitPullRequest, GitMerge, Star, GitFork, Plus } from 'lucide-react';

interface Activity {
  type: string;
  repo: string;
  createdAt: string;
  details: string;
}

interface ActivityFeedProps {
  data: Activity[];
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'PushEvent':
      return <GitCommit className="w-5 h-5 text-green-500" />;
    case 'PullRequestEvent':
      return <GitPullRequest className="w-5 h-5 text-blue-500" />;
    case 'IssuesEvent':
      return <GitMerge className="w-5 h-5 text-yellow-500" />;
    case 'WatchEvent':
      return <Star className="w-5 h-5 text-yellow-400" />;
    case 'ForkEvent':
      return <GitFork className="w-5 h-5 text-purple-500" />;
    case 'CreateEvent':
      return <Plus className="w-5 h-5 text-green-400" />;
    default:
      return <GitCommit className="w-5 h-5 text-gray-500" />;
  }
}

export default function ActivityFeed({ data }: ActivityFeedProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((activity, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition"
        >
          <div className="mt-1">{getActivityIcon(activity.type)}</div>
          <div className="flex-1">
            <p className="text-white font-medium">{activity.details}</p>
            <p className="text-sm text-gray-400 mt-1">
              {activity.repo} • {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
