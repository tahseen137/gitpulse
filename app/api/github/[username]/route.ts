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

// Cache responses for 5 minutes to reduce API calls
export const revalidate = 300;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  // Validate GitHub username format (max 39 chars, alphanumeric + hyphens)
  const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  if (!usernameRegex.test(username)) {
    return NextResponse.json(
      { error: 'Invalid GitHub username format' },
      { status: 400 }
    );
  }

  // GitHub API headers (with optional authentication)
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitPulse-App',
  };

  // Add authentication if GITHUB_TOKEN is available (increases rate limit from 60 to 5000/hour)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      if (userRes.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      if (userRes.status === 403) {
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: userRes.status });
    }
    const user = await userRes.json();

    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );
    const repos = await reposRes.json();

    // Fetch events (for recent activity)
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers }
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
    // Structured logging (avoid exposing stack traces in production)
    if (process.env.NODE_ENV === 'production') {
      console.error('GitHub API error:', {
        username,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } else {
      console.error('Error fetching GitHub data:', error);
    }
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
