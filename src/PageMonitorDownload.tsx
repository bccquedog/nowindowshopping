import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const DOWNLOAD_PATH = "/downloads/pagemonitor-extension-latest.zip";
const GUIDE_URL = `${process.env.PUBLIC_URL || ""}/pagemonitor-guide.md`;
const EXTENSION_VERSION = "0.4.2";

const PageMonitorDownload: React.FC = () => {
  const [guideContent, setGuideContent] = useState<string | null>(null);
  const [guideError, setGuideError] = useState<string | null>(null);

  useEffect(() => {
    fetch(GUIDE_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("Failed to load guide"))))
      .then(setGuideContent)
      .catch((err) => setGuideError(err instanceof Error ? err.message : "Failed to load guide"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">PageMonitor Download</h1>
          <p className="text-sm text-gray-500 mb-3">Page Monitor Pro v{EXTENSION_VERSION}</p>
          <p className="text-gray-700 mb-6">
            Click the button below to download the latest PageMonitor extension ZIP.
          </p>
          <a
            href={DOWNLOAD_PATH}
            download
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Latest PageMonitor ZIP
          </a>
          <div className="mt-5">
            <Link to="/hub" className="text-sm text-blue-600 hover:text-blue-800">
              Back to Hub
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Guide (v{EXTENSION_VERSION})</h2>
          {guideError && (
            <p className="text-red-600 text-sm mb-4">{guideError}</p>
          )}
          {guideContent ? (
            <article className="prose prose-gray prose-sm max-w-none">
              <ReactMarkdown>{guideContent}</ReactMarkdown>
            </article>
          ) : !guideError ? (
            <p className="text-gray-500 animate-pulse">Loading guide...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageMonitorDownload;
