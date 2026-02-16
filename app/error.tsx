'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="glass-card rounded-2xl p-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-gray-400 mb-8">
            We encountered an unexpected error. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
            >
              Go Home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="text-sm text-gray-500 cursor-pointer">
                Error Details (dev only)
              </summary>
              <pre className="mt-4 p-4 bg-gray-900 rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
