import { NextRequest, NextResponse } from 'next/server';

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
    pull_request?: { title: string };
    issue?: { title: string };
  };
}

interface ContributionDay {
  date: string;
  count: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = await userRes.json();

    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    const repos = await reposRes.json();

    // Fetch events (for recent activity)
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`
    );
    const events: GitHubEvent[] = await eventsRes.json();

    // Calculate stats
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

    // Get language stats
    const languageStats: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Calculate contribution heatmap (simplified - last 365 days)
    const contributions = generateContributions(events);

    // Calculate current streak
    const streak = calculateStreak(contributions);

    // Get recent activity (last 10 events)
    const recentActivity = events.slice(0, 10).map((event) => ({
      type: event.type,
      repo: event.repo.name,
      createdAt: event.created_at,
      details: getEventDetails(event),
    }));

    // Calculate productivity score (0-100)
    const productivityScore = calculateProductivityScore(events, repos, contributions);

    // Get most active repo
    const repoActivity: Record<string, number> = {};
    events.forEach((event) => {
      repoActivity[event.repo.name] = (repoActivity[event.repo.name] || 0) + 1;
    });
    const mostActiveRepo = Object.entries(repoActivity)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    return NextResponse.json({
      user: {
        name: user.name || user.login,
        username: user.login,
        avatar: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
      },
      stats: {
        totalStars,
        totalForks,
        totalRepos: repos.length,
        mostActiveRepo,
      },
      topLanguages,
      contributions,
      streak,
      recentActivity,
      productivityScore,
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}

function generateContributions(events: GitHubEvent[]): ContributionDay[] {
  const contributions: Record<string, number> = {};
  const today = new Date();
  
  // Initialize last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    contributions[dateStr] = 0;
  }

  // Count events per day
  events.forEach((event) => {
    const dateStr = event.created_at.split('T')[0];
    if (contributions[dateStr] !== undefined) {
      contributions[dateStr]++;
    }
  });

  return Object.entries(contributions).map(([date, count]) => ({
    date,
    count,
  }));
}

function calculateStreak(contributions: ContributionDay[]): number {
  let streak = 0;
  const sorted = [...contributions].reverse(); // Start from today

  for (const day of sorted) {
    if (day.count > 0) {
      streak++;
    } else if (streak > 0) {
      break;
    }
  }

  return streak;
}

function getEventDetails(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed ${event.payload.commits?.length || 0} commit(s)`;
    case 'PullRequestEvent':
      return `${event.payload.action} a pull request: ${event.payload.pull_request?.title}`;
    case 'IssuesEvent':
      return `${event.payload.action} an issue: ${event.payload.issue?.title}`;
    case 'CreateEvent':
      return 'Created a repository';
    case 'WatchEvent':
      return 'Starred a repository';
    case 'ForkEvent':
      return 'Forked a repository';
    default:
      return event.type.replace('Event', '');
  }
}

function calculateProductivityScore(
  events: GitHubEvent[],
  repos: any[],
  contributions: ContributionDay[]
): number {
  // Simple scoring algorithm
  const recentEvents = events.filter((e) => {
    const eventDate = new Date(e.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return eventDate > thirtyDaysAgo;
  });

  const recentContributions = contributions
    .slice(-30)
    .reduce((acc, day) => acc + day.count, 0);

  const score = Math.min(
    100,
    Math.floor(
      recentEvents.length * 2 +
      repos.length * 0.5 +
      recentContributions * 1.5
    )
  );

  return score;
}
