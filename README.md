# 🚀 GitPulse

**GitHub Wrapped, but live and always up-to-date.**

GitPulse is a beautiful developer activity dashboard that provides real-time insights into GitHub activity, contribution streaks, and productivity metrics.

## 🌐 Live Demo

**🎉 Live at:** [https://gitpulse-eight.vercel.app](https://gitpulse-eight.vercel.app)

**GitHub Repo:** [https://github.com/tahseen137/gitpulse](https://github.com/tahseen137/gitpulse)

Try it with any GitHub username:
- [octocat](https://gitpulse-eight.vercel.app/octocat)
- [torvalds](https://gitpulse-eight.vercel.app/torvalds)
- [tahseen137](https://gitpulse-eight.vercel.app/tahseen137)

## ✨ Features

- **📊 Contribution Heatmap** - Visualize your entire year of contributions at a glance
- **🔥 Streak Counter** - Track your current coding streak and stay motivated
- **📈 Productivity Score** - Personalized score based on commit frequency and PR activity
- **🎨 Language Analytics** - See which programming languages you use most
- **⚡ Real-Time Activity Feed** - View your latest commits, PRs, and issues
- **⭐ Repository Stats** - Track stars, forks, and find your most active repositories

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with glass morphism effects
- **Charts:** Recharts
- **Icons:** Lucide React
- **API:** GitHub REST API (no authentication required)
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tahseen137/gitpulse.git
cd gitpulse
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
gitpulse/
├── app/
│   ├── [username]/          # Dynamic dashboard page
│   ├── api/github/          # GitHub API route
│   ├── pricing/             # Pricing page
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ActivityFeed.tsx     # Recent activity component
│   ├── ContributionHeatmap.tsx  # Heatmap visualization
│   ├── LanguageChart.tsx    # Language pie chart
│   └── StatCard.tsx         # Statistics card component
└── public/                  # Static assets
```

## 🎨 Design Features

- **Dark Mode First** - Optimized for developer eyes
- **Glass Morphism** - Modern, translucent card designs
- **Green Accents** - GitHub-inspired color scheme
- **Animated Components** - Smooth transitions and hover effects
- **Responsive Layout** - Works on all screen sizes

## 📊 API Routes

### GET `/api/github/[username]`

Fetches comprehensive GitHub data for a user:
- User profile information
- Repository statistics
- Contribution data (last 365 days)
- Top programming languages
- Recent activity feed
- Current streak calculation
- Productivity score

## 🎯 Productivity Score Algorithm

The productivity score (0-100) is calculated based on:
- Recent events (last 30 days) × 2
- Total repositories × 0.5
- Recent contributions × 1.5

## 🚢 Deployment

This project is deployed on Vercel with automatic deployments from the `main` branch.

To deploy your own instance:

```bash
npx vercel --prod
```

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Data from [GitHub API](https://docs.github.com/en/rest)
- Deployed on [Vercel](https://vercel.com/)

---

**Built with ❤️ for developers who love tracking their progress**

Made during a hackathon sprint 🚀
