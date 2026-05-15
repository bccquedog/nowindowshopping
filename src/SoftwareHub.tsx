import React from 'react';
import { Link } from 'react-router-dom';

const SoftwareHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            to="/hub"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">Software Hub</h1>
          <p className="text-slate-700 dark:text-slate-300 mb-8">
            Access both software products from one place: the Page Monitor extension and the Product Research Tool.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <article className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page Monitor Pro</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Chrome extension for refresh monitoring, page-change detection, and automation workflows.
              </p>
              <div className="space-y-2">
                <Link to="/pagemonitor" className="block text-blue-600 dark:text-blue-400 hover:underline">
                  Open download page
                </Link>
                <a
                  href="https://pagemonitor.vercel.app/guide.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Open full guide
                </a>
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Product Research Tool</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Standalone Python CLI for URL tracking, snapshot history, and exportable product research data.
              </p>
              <div className="space-y-2">
                <a
                  href="https://pagemonitor.vercel.app/product-research-tool.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Open CLI guide
                </a>
                <a
                  href="https://pagemonitor.vercel.app/downloads/product-research-tool-v0.1.0.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Download CLI zip
                </a>
              </div>
            </article>
          </div>

          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5">
            <p className="text-slate-800 dark:text-slate-200">
              Need the canonical documentation hub?
              <a
                href="https://pagemonitor.vercel.app/softwarehub/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-700 dark:text-blue-300 hover:underline font-semibold"
              >
                Open pagemonitor.vercel.app/softwarehub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareHub;
