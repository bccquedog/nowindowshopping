import React, { useEffect, useState } from 'react';
import { defaultFeatureStatus, FeatureStatus, FeatureStatusType } from './featureStatus';

const STATUS_OPTIONS: FeatureStatusType[] = [
  'Not Started',
  'In Progress',
  'Complete',
  'Blocked',
];

const STORAGE_KEY = 'nws_feature_status';

function loadStatus(): FeatureStatus[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : defaultFeatureStatus;
}

function saveStatus(status: FeatureStatus[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
}

export default function FeatureStatusScreen() {
  const [features, setFeatures] = useState<FeatureStatus[]>(loadStatus());

  useEffect(() => {
    saveStatus(features);
  }, [features]);

  const updateFeature = (key: string, updates: Partial<FeatureStatus>) => {
    setFeatures(f => f.map(feat => feat.key === key ? { ...feat, ...updates } : feat));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Feature/Screen Completion Status</h2>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Feature/Screen</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {features.map(f => (
            <tr key={f.key} className="border-t border-gray-200">
              <td className="px-4 py-2 font-medium">{f.name}</td>
              <td className="px-4 py-2">
                <select
                  value={f.status}
                  onChange={e => updateFeature(f.key, { status: e.target.value as FeatureStatusType })}
                  className="border rounded px-2 py-1"
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={f.notes || ''}
                  onChange={e => updateFeature(f.key, { notes: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Add notes..."
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-gray-500 text-sm text-center">All changes are saved automatically.</div>
    </div>
  );
} 