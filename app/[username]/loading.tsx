import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Loading dashboard...</p>
        <p className="text-gray-500 text-sm mt-2">Fetching GitHub data</p>
      </div>
    </div>
  );
}
