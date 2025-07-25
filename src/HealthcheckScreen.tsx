import React, { useEffect, useState } from 'react';
import { runHealthcheck, SystemHealth } from './healthcheck';
import { defaultFeatureStatus, FeatureStatusType } from './featureStatus';

const statusColors: Record<string, string> = {
  OK: 'text-green-600',
  Warning: 'text-yellow-600',
  Error: 'text-red-600',
  'Missing Dependency': 'text-red-600',
};

const statusBgColors: Record<string, string> = {
  OK: 'bg-green-50',
  Warning: 'bg-yellow-50',
  Error: 'bg-red-50',
  'Missing Dependency': 'bg-red-50',
};

const overallStatusColors = {
  Healthy: 'text-green-600 bg-green-50',
  Degraded: 'text-yellow-600 bg-yellow-50',
  Critical: 'text-red-600 bg-red-50',
};

export default function HealthcheckScreen() {
  const [healthData, setHealthData] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Feature status summary
  const featureCounts = defaultFeatureStatus.reduce(
    (acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    },
    {} as Record<FeatureStatusType, number>
  );

  useEffect(() => {
    runHealthcheck().then(data => {
      setHealthData(data);
      setLoading(false);
    });
  }, []);

  const toggleModuleExpansion = (moduleName: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleName)) {
      newExpanded.delete(moduleName);
    } else {
      newExpanded.add(moduleName);
    }
    setExpandedModules(newExpanded);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Running comprehensive healthcheck...</p>
        </div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center text-red-600">
          <p>Failed to load health check data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">System Health Dashboard</h2>
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${overallStatusColors[healthData.overall]}`}>
          <span className={`w-3 h-3 rounded-full mr-2 ${healthData.overall === 'Healthy' ? 'bg-green-500' : healthData.overall === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
          Overall Status: {healthData.overall}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Screen Resolution:</span>
            <p className="text-gray-900">{healthData.systemInfo.screenResolution}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Memory Usage:</span>
            <p className="text-gray-900">{healthData.systemInfo.memoryUsage ? `${healthData.systemInfo.memoryUsage} MB` : 'Not available'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Last Checked:</span>
            <p className="text-gray-900">{healthData.systemInfo.timestamp.toLocaleString()}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">User Agent:</span>
            <p className="text-gray-900 text-xs truncate">{healthData.systemInfo.userAgent}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{healthData.summary.total}</div>
          <div className="text-sm text-gray-600">Total Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{healthData.summary.healthy}</div>
          <div className="text-sm text-gray-600">Healthy</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{healthData.summary.warnings}</div>
          <div className="text-sm text-gray-600">Warnings</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{healthData.summary.errors}</div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{healthData.summary.missing}</div>
          <div className="text-sm text-gray-600">Missing</div>
        </div>
      </div>

      {/* Feature Status Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Feature Development Status</h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="text-green-700 font-semibold">{featureCounts['Complete'] || 0} Complete</span>
          <span className="text-yellow-700 font-semibold">{featureCounts['In Progress'] || 0} In Progress</span>
          <span className="text-gray-700 font-semibold">{featureCounts['Not Started'] || 0} Not Started</span>
          <span className="text-red-700 font-semibold">{featureCounts['Blocked'] || 0} Blocked</span>
        </div>
      </div>

      {/* Module Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-xl font-semibold">Module Health Details</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {healthData.modules.map((module) => (
            <div key={module.name} className={`p-4 ${statusBgColors[module.status]}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${module.status === 'OK' ? 'bg-green-500' : module.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className={`font-medium ${statusColors[module.status]}`}>{module.status}</span>
                      {module.performance && (
                        <span>Load time: {module.performance}ms</span>
                      )}
                      <span>Last checked: {module.lastChecked.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleModuleExpansion(module.name)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedModules.has(module.name) ? '▼' : '▶'}
                </button>
              </div>
              
              {expandedModules.has(module.name) && (
                <div className="mt-4 pl-6 space-y-3">
                  {module.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <div className="font-medium text-red-800 mb-1">Error Details:</div>
                      <div className="text-red-700 text-sm">{module.error}</div>
                    </div>
                  )}
                  
                  {module.dependencies && module.dependencies.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <div className="font-medium text-yellow-800 mb-1">Missing Dependencies:</div>
                      <div className="text-yellow-700 text-sm">
                        {module.dependencies.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  {module.recommendations && module.recommendations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <div className="font-medium text-blue-800 mb-1">Recommendations:</div>
                      <ul className="text-blue-700 text-sm space-y-1">
                        {module.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 