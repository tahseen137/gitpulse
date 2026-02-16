# 📊 GitPulse

**GitHub activity dashboard for developers and freelancers**  
Track your coding progress with beautiful, real-time visualizations.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/gitpulse)

---

## 🎯 What is GitPulse?

GitPulse is a **free, open-source GitHub analytics dashboard** that helps developers visualize their coding activity. Think of it as "GitHub Wrapped" but live and always up-to-date.

**Perfect for:**
- 👨‍💻 **Developers** tracking their coding progress
- 💼 **Freelancers** showcasing activity to clients
- 🎓 **Students** building their portfolios
- 🏆 **Open-source contributors** monitoring their impact

**Live Demo:** [gitpulse-eight.vercel.app](https://gitpulse-eight.vercel.app)

---

## ✨ Features

### 📊 Analytics & Insights
- **Contribution Heatmap** — Visualize your entire year of activity at a glance
- **Streak Counter** — Track consecutive days of contributions
- **Language Breakdown** — See which languages you use most
- **Productivity Score** — Calculated from recent activity (0-100)
- **Repository Stats** — Total stars, forks, and most active repos
- **Activity Feed** — Real-time timeline of commits, PRs, and issues

### 🎨 Design
- **Beautiful UI** — Glass morphism design with smooth animations
- **Dark Mode** — Easy on the eyes, GitHub-inspired green accents
- **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- **Fast Loading** — Static page generation with API caching

### 🔒 Privacy & Security
- **No Sign-In Required** — Works with any public GitHub profile
- **No Data Stored** — All data fetched directly from GitHub API
- **Open Source** — Review the code yourself

---

## 🚀 Quick Start

### Option 1: Use the Live App

Visit [gitpulse-eight.vercel.app](https://gitpulse-eight.vercel.app) and enter any GitHub username!

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/tahseen137/gitpulse.git
cd gitpulse

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter a GitHub username.

### Option 3: Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/gitpulse)

---

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env.local` file to enable higher GitHub API rate limits:

```env
# Optional: GitHub Personal Access Token
# Increases rate limit from 60/hour to 5,000/hour
GITHUB_TOKEN=ghp_your_token_here
```

**To get a GitHub token:**
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select `public_repo` scope (or leave all unchecked for public data only)
4. Copy the token and add to `.env.local`

**Without a token:** App still works but limited to 60 requests/hour (shared across all users).  
**With a token:** 5,000 requests/hour (recommended for production).

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Charts** | [Recharts 3](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **API** | [GitHub REST API v3](https://docs.github.com/en/rest) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📊 API Usage

GitPulse uses the GitHub REST API to fetch public data:

### Endpoints Used
- `GET /users/{username}` — User profile
- `GET /users/{username}/repos` — Public repositories
- `GET /users/{username}/events/public` — Recent activity

### Rate Limits
| Authentication | Limit |
|----------------|-------|
| No token | 60 requests/hour per IP |
| With token | 5,000 requests/hour |

**Tip:** Add a `GITHUB_TOKEN` environment variable for production deployments.

---

## 🎯 How It Works

1. **Enter a GitHub username** on the homepage
2. **GitPulse fetches data** from GitHub's public API
3. **Dashboard displays:**
   - Contribution heatmap (last 365 days estimated from recent events)
   - Current streak (consecutive days with activity)
   - Top 5 programming languages
   - Recent 10 activities (commits, PRs, issues)
   - Repository stats (stars, forks)
   - Productivity score (calculated from 30-day activity)

**Note:** Contribution data is estimated from recent GitHub events (last 100). GitHub's official contribution graph requires authentication and GraphQL API access.

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ and npm
- (Optional) GitHub Personal Access Token

### Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
gitpulse/
├── app/
│   ├── api/github/[username]/  # API route for GitHub data
│   ├── [username]/             # Dashboard page
│   ├── pricing/                # Pricing page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── error.tsx               # Error boundary
│   └── not-found.tsx           # 404 page
├── components/
│   ├── ActivityFeed.tsx        # Recent activity timeline
│   ├── ContributionHeatmap.tsx # Contribution calendar
│   ├── LanguageChart.tsx       # Language pie chart
│   └── StatCard.tsx            # Stat display card
└── public/                     # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**  
   ```bash
   npm run build  # Must pass with zero errors
   ```
5. **Commit with clear message**  
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your fork**  
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Quality Standards
- ✅ TypeScript strict mode (no `any` types)
- ✅ ESLint rules must pass
- ✅ Build must succeed with zero errors
- ✅ Responsive design (mobile-first)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

Just include the original license and copyright notice.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- Data from [GitHub API](https://docs.github.com/en/rest)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Inspired by GitHub's Year in Review

---

## 📧 Support

- **Issues:** [GitHub Issues](https://github.com/tahseen137/gitpulse/issues)
- **Discussions:** [GitHub Discussions](https://github.com/tahseen137/gitpulse/discussions)

---

## 🌟 Show Your Support

If you find GitPulse useful, give it a ⭐ on GitHub!

**Track your code, celebrate your progress.** 📊💚
