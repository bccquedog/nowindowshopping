// Enhanced Healthcheck utility for major app modules
export type ModuleStatus = 'OK' | 'Warning' | 'Error' | 'Missing Dependency';

export interface HealthcheckResult {
  name: string;
  status: ModuleStatus;
  error?: string;
  performance?: number; // Load time in ms
  dependencies?: string[];
  lastChecked: Date;
  recommendations?: string[];
}

export interface SystemHealth {
  overall: 'Healthy' | 'Degraded' | 'Critical';
  modules: HealthcheckResult[];
  summary: {
    total: number;
    healthy: number;
    warnings: number;
    errors: number;
    missing: number;
  };
  systemInfo: {
    userAgent: string;
    screenResolution: string;
    timestamp: Date;
    memoryUsage?: number;
  };
}

const modules = [
  { name: 'LandingPage', path: './App', critical: true },
  { name: 'InteractiveHub', path: './App', critical: true },
  { name: 'CoachCare', path: './App', critical: true },
  { name: 'ITServices', path: './App', critical: false },
  { name: 'MGCU', path: './App', critical: false },
  { name: 'Blog', path: './App', critical: false },
  { name: 'About', path: './App', critical: false },
  { name: 'Contact', path: './App', critical: false },
  { name: 'Support', path: './App', critical: false },
  { name: 'WebStore', path: './App', critical: false },
  { name: 'Terms', path: './App', critical: false },
  { name: 'Booking', path: './App', critical: false },
];

// Performance monitoring
const performanceMarks: Record<string, number> = {};

// Dependency checker
const checkDependencies = (moduleName: string): string[] => {
  const deps: string[] = [];
  
  // Check for common React dependencies
  if (typeof window !== 'undefined' && !(window as any).React) deps.push('React');
  if (typeof window !== 'undefined' && !(window as any).ReactDOM) deps.push('ReactDOM');
  
  // Module-specific dependencies
  switch (moduleName) {
    case 'CoachCare':
      if (typeof localStorage === 'undefined') deps.push('localStorage');
      break;
    case 'Support':
      if (typeof fetch === 'undefined') deps.push('fetch API');
      break;
    case 'WebStore':
      if (typeof window !== 'undefined' && !window.PaymentRequest) deps.push('Payment API');
      break;
  }
  
  return deps;
};

// Generate recommendations
const generateRecommendations = (result: HealthcheckResult): string[] => {
  const recs: string[] = [];
  
  if (result.status === 'Error') {
    recs.push('Check console for detailed error messages');
    recs.push('Verify all dependencies are properly installed');
  }
  
  if (result.status === 'Warning') {
    recs.push('Consider optimizing performance');
    recs.push('Review error handling');
  }
  
  if (result.performance && result.performance > 1000) {
    recs.push('Module load time is slow - consider code splitting');
  }
  
  if (result.dependencies && result.dependencies.length > 0) {
    recs.push(`Missing dependencies: ${result.dependencies.join(', ')}`);
  }
  
  return recs;
};

export async function runHealthcheck(): Promise<SystemHealth> {
  const results: HealthcheckResult[] = [];
  
  for (const mod of modules) {
    const moduleStart = performance.now();
    
    try {
      // Mark performance start
      performanceMarks[mod.name] = moduleStart;
      
      const imported = await import(/* @vite-ignore */ mod.path);
      const loadTime = performance.now() - moduleStart;
      
      if (imported && imported[mod.name]) {
        const dependencies = checkDependencies(mod.name);
        const status: ModuleStatus = dependencies.length > 0 ? 'Warning' : 'OK';
        
        const result: HealthcheckResult = {
          name: mod.name,
          status,
          performance: Math.round(loadTime),
          dependencies: dependencies.length > 0 ? dependencies : undefined,
          lastChecked: new Date(),
          recommendations: generateRecommendations({
            name: mod.name,
            status,
            performance: loadTime,
            dependencies,
            lastChecked: new Date()
          })
        };
        
        results.push(result);
      } else {
        results.push({
          name: mod.name,
          status: 'Error',
          error: 'Component not found in module.',
          lastChecked: new Date(),
          recommendations: ['Check component export', 'Verify import path']
        });
      }
    } catch (err: any) {
      const loadTime = performance.now() - moduleStart;
      
      if (err.message && err.message.includes('Cannot find module')) {
        results.push({
          name: mod.name,
          status: 'Missing Dependency',
          error: err.message,
          performance: Math.round(loadTime),
          lastChecked: new Date(),
          recommendations: ['Install missing dependencies', 'Check package.json']
        });
      } else {
        results.push({
          name: mod.name,
          status: 'Error',
          error: err.message || String(err),
          performance: Math.round(loadTime),
          lastChecked: new Date(),
          recommendations: ['Check error logs', 'Verify module integrity']
        });
      }
    }
  }
  
  // Calculate summary
  const summary = {
    total: results.length,
    healthy: results.filter(r => r.status === 'OK').length,
    warnings: results.filter(r => r.status === 'Warning').length,
    errors: results.filter(r => r.status === 'Error').length,
    missing: results.filter(r => r.status === 'Missing Dependency').length,
  };
  
  // Determine overall health
  let overall: 'Healthy' | 'Degraded' | 'Critical' = 'Healthy';
  if (summary.errors > 0 || summary.missing > 2) {
    overall = 'Critical';
  } else if (summary.warnings > 0 || summary.missing > 0) {
    overall = 'Degraded';
  }
  
  // System information
  const systemInfo = {
    userAgent: navigator.userAgent,
    screenResolution: typeof window !== 'undefined' && window.screen ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
    timestamp: new Date(),
    memoryUsage: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : undefined,
  };
  
  return {
    overall,
    modules: results,
    summary,
    systemInfo
  };
}

// Additional utility functions
export const getModulePerformance = (moduleName: string): number | undefined => {
  return performanceMarks[moduleName];
};

export const clearPerformanceMarks = () => {
  Object.keys(performanceMarks).forEach(key => delete performanceMarks[key]);
}; 