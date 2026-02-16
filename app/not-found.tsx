import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="glass-card rounded-2xl p-12">
          <Search className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
