import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-500">
            GitPulse
          </Link>
          <Link
            href="/"
            className="px-4 py-2 hover:bg-gray-800 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">
            Start free, upgrade when you need more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card rounded-2xl p-8 border-2 border-gray-700">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-5xl font-bold mb-4">
                $0<span className="text-lg text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Perfect for public repositories</p>
            </div>

            <ul className="space-y-4 mb-8">
              <Feature text="Public repository analytics" />
              <Feature text="Contribution heatmap" />
              <Feature text="Streak counter" />
              <Feature text="Top languages chart" />
              <Feature text="Recent activity feed" />
              <Feature text="Repository stats" />
              <Feature text="Productivity score" />
            </ul>

            <Link
              href="/"
              className="block w-full text-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-card rounded-2xl p-8 border-2 border-green-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-1 bg-green-500 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Most Popular
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-5xl font-bold mb-4">
                $9<span className="text-lg text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">For serious developers</p>
            </div>

            <ul className="space-y-4 mb-8">
              <Feature text="Everything in Free" highlighted />
              <Feature text="Private repository analytics" highlighted />
              <Feature text="Advanced productivity insights" highlighted />
              <Feature text="Custom contribution goals" highlighted />
              <Feature text="Team analytics" highlighted />
              <Feature text="Export reports (PDF/CSV)" highlighted />
              <Feature text="Priority support" highlighted />
              <Feature text="API access" highlighted />
            </ul>

            <button className="block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <FAQItem
              question="Do I need a GitHub account?"
              answer="No! GitPulse works with any public GitHub profile. Just enter a username to see their stats."
            />
            <FAQItem
              question="How often is the data updated?"
              answer="Data is fetched live from GitHub API every time you view a dashboard, so it's always up-to-date."
            />
            <FAQItem
              question="Can I use this for private repositories?"
              answer="Private repositories require the Pro plan and GitHub authentication to access your private data."
            />
            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes! Pro subscriptions can be cancelled at any time. You'll retain access until the end of your billing period."
            />
            <FAQItem
              question="Is there a refund policy?"
              answer="We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund."
            />
          </div>
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

function Feature({ text, highlighted = false }: { text: string; highlighted?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <Check className={`w-5 h-5 flex-shrink-0 ${highlighted ? 'text-green-500' : 'text-gray-400'}`} />
      <span>{text}</span>
    </li>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
}
