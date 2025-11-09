import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Edit3, 
  Eye, 
  Save, 
  X, 
  Send, 
  Copy,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Trash2
} from 'lucide-react';
import { emailTemplates, EmailTemplateConfig, getTemplatesByCategory, getTemplateCategories, validateTemplateVariables } from '../emailTemplates';
import { emailService } from '../emailService';

interface EmailTemplateManagerProps {
  onClose?: () => void;
}

export const EmailTemplateManager: React.FC<EmailTemplateManagerProps> = ({ onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  // Template editing state
  const [editForm, setEditForm] = useState<EmailTemplateConfig>({
    subject: '',
    html: '',
    text: '',
    category: 'onboarding',
    description: ''
  });

  const categories = getTemplateCategories();
  const filteredTemplates = Object.entries(emailTemplates)
    .filter(([key, template]) => {
      const matchesSearch = key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const currentTemplate = selectedTemplate ? emailTemplates[selectedTemplate] : null;

  useEffect(() => {
    if (editingTemplate && emailTemplates[editingTemplate]) {
      setEditForm(emailTemplates[editingTemplate]);
    }
  }, [editingTemplate]);

  const handleEditTemplate = (templateKey: string) => {
    setEditingTemplate(templateKey);
    setEditForm(emailTemplates[templateKey]);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      // In a real application, this would save to the backend
      console.log('Saving template:', editingTemplate, editForm);
      setEditingTemplate(null);
      setEditForm({
        subject: '',
        html: '',
        text: '',
        category: 'onboarding',
        description: ''
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
    setEditForm({
      subject: '',
      html: '',
      text: '',
      category: 'onboarding',
      description: ''
    });
  };

  const handleSendTestEmail = async () => {
    if (!testEmail || !selectedTemplate) return;

    setIsSendingTest(true);
    try {
      const result = await emailService.sendEmail({
        to: testEmail,
        toName: 'Test User',
        from: 'noreply@coachcare.com',
        fromName: 'CoachCare',
        template: selectedTemplate as any,
        data: {
          clientName: 'Test Client',
          coachName: 'Test Coach',
          sessionDate: '2024-01-15',
          sessionTime: '10:00 AM',
          sessionDuration: '60 minutes',
          sessionFocus: 'Leadership Coaching Session',
          sessionUrl: 'https://coachcare.com/sessions/test',
          dashboardUrl: 'https://coachcare.com/dashboard',
          gettingStartedUrl: 'https://coachcare.com/getting-started',
          faqUrl: 'https://coachcare.com/faq',
          supportUrl: 'https://coachcare.com/support',
          email: testEmail,
          goalTitle: 'Improve Communication Skills',
          goalDeadline: '2024-02-15',
          daysRemaining: 7,
          goalProgress: 75,
          goalDescription: 'Develop better communication skills for team leadership',
          progressMessage: 'Great progress! You\'re 75% complete.',
          goalUrl: 'https://coachcare.com/goals/test',
          completionDate: '2024-01-15',
          achievementMessage: 'You\'ve successfully completed your goal!',
          userName: 'Test User',
          resetUrl: 'https://coachcare.com/reset-password?token=test',
          sessionTitle: 'Leadership Coaching Session',
          sessionLocation: 'Virtual Meeting',
          sessionDescription: 'We\'ll focus on developing your leadership skills and communication techniques.'
        }
      });

      if (result.success) {
        alert('Test email sent successfully!');
        setShowTestModal(false);
        setTestEmail('');
      } else {
        alert('Failed to send test email: ' + result.message);
      }
    } catch (error) {
      alert('Error sending test email: ' + error);
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleCopyTemplate = (templateKey: string) => {
    const template = emailTemplates[templateKey];
    const templateText = `Subject: ${template.subject}\n\nHTML:\n${template.html}\n\nText:\n${template.text}`;
    navigator.clipboard.writeText(templateText);
    alert('Template copied to clipboard!');
  };

  const handleExportTemplate = (templateKey: string) => {
    const template = emailTemplates[templateKey];
    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateKey}-template.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderTemplatePreview = () => {
    if (!currentTemplate) return null;

    const sampleData = {
      clientName: 'John Smith',
      coachName: 'Sarah Johnson',
      sessionDate: '2024-01-15',
      sessionTime: '10:00 AM',
      sessionDuration: '60 minutes',
      sessionFocus: 'Leadership Development',
      sessionUrl: 'https://coachcare.com/sessions/123',
      dashboardUrl: 'https://coachcare.com/dashboard',
      gettingStartedUrl: 'https://coachcare.com/getting-started',
      faqUrl: 'https://coachcare.com/faq',
      supportUrl: 'https://coachcare.com/support',
      email: 'john@example.com',
      goalTitle: 'Improve Communication Skills',
      goalDeadline: '2024-02-15',
      daysRemaining: 7,
      goalProgress: 75,
      goalDescription: 'Develop better communication skills for team leadership',
      progressMessage: 'Great progress! You\'re 75% complete.',
      goalUrl: 'https://coachcare.com/goals/456',
      completionDate: '2024-01-15',
      achievementMessage: 'You\'ve successfully completed your goal!',
      userName: 'John Smith',
      resetUrl: 'https://coachcare.com/reset-password?token=abc123',
      sessionTitle: 'Leadership Coaching Session',
      sessionLocation: 'Virtual Meeting',
      sessionDescription: 'We\'ll focus on developing your leadership skills and communication techniques.'
    };

    const processTemplate = (template: string) => {
      return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        const value = sampleData[key as keyof typeof sampleData];
        return value ? String(value) : match;
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Template Preview: {currentTemplate.description}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode('html')}
              className={`px-3 py-1 rounded text-sm ${
                previewMode === 'html' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setPreviewMode('text')}
              className={`px-3 py-1 rounded text-sm ${
                previewMode === 'text' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setShowTestModal(true)}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              <Send className="w-4 h-4 mr-1" />
              Test
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Subject:</strong> {processTemplate(currentTemplate.subject)}
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {previewMode === 'html' ? (
            <div 
              className="p-4 bg-gray-50 dark:bg-gray-900 max-h-96 overflow-y-auto"
              dangerouslySetInnerHTML={{ 
                __html: processTemplate(currentTemplate.html) 
              }}
            />
          ) : (
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 text-sm max-h-96 overflow-y-auto whitespace-pre-wrap">
              {processTemplate(currentTemplate.text)}
            </pre>
          )}
        </div>
      </div>
    );
  };

  const renderEditForm = () => {
    if (!editingTemplate) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Template: {editingTemplate}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveTemplate}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={editForm.category}
              onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={editForm.subject}
              onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              HTML Template
            </label>
            <textarea
              value={editForm.html}
              onChange={(e) => setEditForm(prev => ({ ...prev, html: e.target.value }))}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text Template
            </label>
            <textarea
              value={editForm.text}
              onChange={(e) => setEditForm(prev => ({ ...prev, text: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Email Template Manager
            </h1>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Templates ({filteredTemplates.length})
                </h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredTemplates.map(([key, template]) => (
                  <div
                    key={key}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedTemplate === key ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedTemplate(key)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {template.description}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                          {template.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTemplate(key);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Edit template"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyTemplate(key);
                          }}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Copy template"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportTemplate(key);
                          }}
                          className="p-1 text-gray-400 hover:text-purple-600"
                          title="Export template"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template Preview/Edit */}
          <div className="lg:col-span-2">
            {editingTemplate ? renderEditForm() : renderTemplatePreview()}
          </div>
        </div>

        {/* Test Email Modal */}
        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Send Test Email
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendTestEmail}
                  disabled={!testEmail || isSendingTest}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSendingTest ? 'Sending...' : 'Send Test'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
