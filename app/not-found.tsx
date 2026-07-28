import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Color Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">The requested color code or page could not be found.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
