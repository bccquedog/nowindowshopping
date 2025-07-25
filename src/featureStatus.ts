export type FeatureStatusType = 'Not Started' | 'In Progress' | 'Complete' | 'Blocked';

export interface FeatureStatus {
  key: string;
  name: string;
  status: FeatureStatusType;
  notes?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export const defaultFeatureStatus: FeatureStatus[] = [
  { key: 'landing', name: 'Landing Page', status: 'Complete', priority: 'High' },
  { key: 'hub', name: 'Interactive Hub', status: 'Complete', priority: 'High' },
  { key: 'coachcare', name: 'CoachCare CRM', status: 'Complete', priority: 'High', notes: 'Full admin and client portal with role-based access control implemented' },
  { key: 'itservices', name: 'IT Services', status: 'Complete', priority: 'Medium' },
  { key: 'mgcu', name: 'MGCU', status: 'Complete', priority: 'Medium', notes: 'About page live. Future expansion possible.' },
  { key: 'blog', name: 'NWS Blog', status: 'In Progress', priority: 'Medium', notes: 'Blog is visible and working, but not a full CMS.' },
  { key: 'about', name: 'About the Founder', status: 'Complete', priority: 'Low' },
  { key: 'contact', name: 'Contact', status: 'Complete', priority: 'Medium' },
  { key: 'support', name: 'Support/Ticketing', status: 'In Progress', priority: 'High', notes: 'Basic structure exists, needs enhancement' },
  { key: 'webstore', name: 'Web Store', status: 'Not Started', priority: 'Medium', notes: 'Placeholder exists, no e-commerce functionality' },
  { key: 'terms', name: 'Terms', status: 'Not Started', priority: 'Low', notes: 'No content implemented' },
  { key: 'booking', name: 'Booking', status: 'Not Started', priority: 'High', notes: 'No booking system implemented' },
  { key: 'settings', name: 'Settings', status: 'Complete', priority: 'Medium' },
  { key: 'healthcheck', name: 'Healthcheck Utility', status: 'Complete', priority: 'Medium', notes: 'Recently upgraded with comprehensive monitoring' },
  { key: 'featureStatus', name: 'Feature Status Tracker', status: 'Complete', priority: 'Low' },
]; 