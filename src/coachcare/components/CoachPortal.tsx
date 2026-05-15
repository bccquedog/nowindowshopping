import React, { useState } from 'react';
import { useAuth, useClients, useSessions, useGoals, useCommunications, useInvoices } from '../context';
import VideoCall from '../../components/VideoCall';
import VideoChat from '../../components/VideoChat';
import VideoSessionManager from '../../components/VideoSessionManager';
import LMSHub from './LMSHub';
import NotificationBell from './NotificationBell';
import NotificationCenter from './NotificationCenter';
import { Users, Calendar, Target, DollarSign, FileText, AlertTriangle, BarChart3, Video, Camera, FileCheck, Plus, Search, Edit, Trash2, X, Mail, Phone, MapPin, Clock, MessageSquare, Send, Inbox, Paperclip, Filter, TrendingUp, PieChart, Activity, Settings as SettingsIcon, User, Bell, Shield, Palette, BookOpen, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Invoice, Client, Session, Communication } from '../types';

export const CoachPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const { sessions, addSession, updateSession, deleteSession } = useSessions();
  const { goals } = useGoals();
  const { communications, addCommunication, updateCommunication, deleteCommunication } = useCommunications();
  const { invoices, addInvoice, deleteInvoice: removeInvoice, markInvoicePaid } = useInvoices();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [invoiceForm, setInvoiceForm] = useState({
    clientId: '',
    amount: '',
    description: '',
    dueDate: '',
    service: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [showVideoSessionManager, setShowVideoSessionManager] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [clientFilterStatus, setClientFilterStatus] = useState('all');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    status: 'active' as Client['status'],
    notes: '',
  });
  const [sessionSearchTerm, setSessionSearchTerm] = useState('');
  const [sessionFilterStatus, setSessionFilterStatus] = useState('all');
  const [sessionFilterType, setSessionFilterType] = useState('all');
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [sessionForm, setSessionForm] = useState({
    clientId: '',
    title: '',
    type: 'follow-up' as Session['type'],
    date: '',
    startTime: '',
    endTime: '',
    duration: 60,
    status: 'scheduled' as Session['status'],
    price: 150,
    location: 'video' as Session['location'],
    meetingLink: '',
    notes: '',
    goals: '',
    actionItems: '',
  });
  const [commSearchTerm, setCommSearchTerm] = useState('');
  const [commFilterType, setCommFilterType] = useState('all');
  const [commFilterDirection, setCommFilterDirection] = useState('all');
  const [commFilterStatus, setCommFilterStatus] = useState('all');
  const [showAddCommModal, setShowAddCommModal] = useState(false);
  const [editingComm, setEditingComm] = useState<Communication | null>(null);
  const [commForm, setCommForm] = useState({
    clientId: '',
    type: 'email' as Communication['type'],
    subject: '',
    content: '',
    direction: 'outbound' as Communication['direction'],
    status: 'sent' as Communication['status'],
    scheduledDate: '',
  });
  const [profileSettings, setProfileSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    goalReminders: true,
    invoiceNotifications: true,
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    autoSave: true,
    dataSync: true,
    analytics: true,
    debugMode: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    dataRetention: 365,
    shareAnalytics: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [completedGuideSteps, setCompletedGuideSteps] = useState<Set<string>>(new Set());
  const [settingsTab, setSettingsTab] = useState('profile');

  // Validation helper
  const validateForm = (formType: 'invoice' | 'client' | 'session' | 'communication', formData: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (formType === 'invoice') {
      if (!formData.clientId) errors.clientId = 'Client is required';
      if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Valid amount is required';
      if (!formData.dueDate) errors.dueDate = 'Due date is required';
      if (!formData.service) errors.service = 'Service type is required';
    }
    
    if (formType === 'client') {
      if (!formData.name?.trim()) errors.name = 'Name is required';
      if (!formData.email?.trim()) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
      if (!formData.phone?.trim()) errors.phone = 'Phone is required';
      if (!formData.street?.trim()) errors.street = 'Street address is required';
      if (!formData.city?.trim()) errors.city = 'City is required';
      if (!formData.state?.trim()) errors.state = 'State is required';
      if (!formData.zip?.trim()) errors.zip = 'ZIP code is required';
    }
    
    if (formType === 'session') {
      if (!formData.clientId) errors.clientId = 'Client is required';
      if (!formData.title?.trim()) errors.title = 'Title is required';
      if (!formData.date) errors.date = 'Date is required';
      if (!formData.startTime) errors.startTime = 'Start time is required';
      if (!formData.endTime) errors.endTime = 'End time is required';
      if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
        errors.endTime = 'End time must be after start time';
      }
      if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
    }
    
    if (formType === 'communication') {
      if (!formData.clientId) errors.clientId = 'Client is required';
      if (!formData.subject?.trim()) errors.subject = 'Subject is required';
      if (!formData.content?.trim()) errors.content = 'Content is required';
    }
    
    return errors;
  };

  const handleInvoiceInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceForm({ ...invoiceForm, [name]: value });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const errors = validateForm('invoice', invoiceForm);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    const amount = parseFloat(invoiceForm.amount);
    const newInvoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'> = {
      clientId: invoiceForm.clientId,
      coachId: user?.id || '',
      number: `INV-${Date.now()}`,
      amount: amount,
      total: amount,
      status: 'sent',
      dueDate: invoiceForm.dueDate,
      items: [{
        description: invoiceForm.description || invoiceForm.service,
        quantity: 1,
        rate: amount,
        amount: amount,
      }],
      notes: invoiceForm.service,
    };
    await addInvoice(newInvoice);
    setFormMessage('Invoice created successfully!');
    setFormErrors({});
    setInvoiceForm({
      clientId: '', amount: '', description: '', dueDate: '', service: '',
    });
    setIsSubmitting(false);
    setTimeout(() => setFormMessage(''), 4000);
  };

  // Dashboard, Clients, Sessions, etc. can be expanded later
  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clients.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Sessions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{sessions.filter(s => s.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Goals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{goals.filter(g => g.status === 'in-progress').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button 
            onClick={() => {
              setEditingClient(null);
              setClientForm({
                name: '', email: '', phone: '', street: '', street2: '', city: '', state: '', zip: '', country: 'USA',
                status: 'active', notes: '',
              });
              setShowAddClientModal(true);
              setActiveTab('clients');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Client
          </button>
          <button 
            onClick={() => {
              setEditingSession(null);
              setSessionForm({
                clientId: '', title: '', type: 'follow-up', date: '', startTime: '', endTime: '', duration: 60,
                status: 'scheduled', price: 150, location: 'video', meetingLink: '', notes: '', goals: '', actionItems: '',
              });
              setShowAddSessionModal(true);
              setActiveTab('sessions');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
          <button 
            onClick={() => {
              setShowAddGoalModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Goal
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Create Invoice
          </button>
          <button 
            onClick={() => setShowVideoCall(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" />
            Quick Video Call
          </button>
          <button 
            onClick={() => setShowVideoChat(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Start Coaching Session
          </button>
          <button 
            onClick={() => setShowVideoSessionManager(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            Manage Sessions
          </button>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Billing & Invoices</h2>
      
      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Invoices</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'sent').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invoices</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{invoices.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Invoice</h3>
        <form onSubmit={handleInvoiceSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select 
              name="clientId" 
              value={invoiceForm.clientId} 
              onChange={handleInvoiceInput} 
              required 
              className={`px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                formErrors.clientId ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            <div>
            <input 
              name="amount" 
              value={invoiceForm.amount} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Amount ($)" 
              type="number" 
              step="0.01"
                className={`px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full ${
                  formErrors.amount ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
            />
              {formErrors.amount && <p className="text-red-500 text-xs mt-1">{formErrors.amount}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <input 
              name="service" 
              value={invoiceForm.service} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Service Type" 
                className={`px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full ${
                  formErrors.service ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
            />
              {formErrors.service && <p className="text-red-500 text-xs mt-1">{formErrors.service}</p>}
            </div>
            <div>
            <input 
              name="dueDate" 
              value={invoiceForm.dueDate} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Due Date" 
              type="date" 
                className={`px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full ${
                  formErrors.dueDate ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
            />
              {formErrors.dueDate && <p className="text-red-500 text-xs mt-1">{formErrors.dueDate}</p>}
            </div>
          </div>
          <textarea 
            name="description" 
            value={invoiceForm.description} 
            onChange={handleInvoiceInput} 
            required 
            placeholder="Invoice Description" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold"
          >
            {isSubmitting ? 'Creating...' : 'Create Invoice'}
          </button>
          {formMessage && <div className="text-green-600 dark:text-green-400 font-medium mt-2">{formMessage}</div>}
          {Object.keys(formErrors).length > 0 && (
            <div className="text-red-600 dark:text-red-400 text-sm mt-2">
              {Object.values(formErrors).filter(e => e).map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Invoices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Invoice #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Client</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Due Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-500 dark:text-gray-400 py-4">No invoices yet</td></tr>
              )}
              {invoices.map(invoice => {
                const client = clients.find(c => c.id === invoice.clientId);
                const getStatusColor = (status: Invoice['status']) => {
                  switch (status) {
                    case 'paid': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
                    case 'sent': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
                    case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
                    case 'draft': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
                    case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
                    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
                  }
                };
                return (
                  <tr key={invoice.id}>
                    <td className="px-4 py-2 whitespace-nowrap font-medium">{invoice.number}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{client?.name || 'Unknown Client'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{invoice.notes || 'Coaching Service'}</td>
                    <td className="px-4 py-2 whitespace-nowrap font-medium">${invoice.total.toLocaleString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button 
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowInvoiceModal(true);
                        }}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={async () => {
                          await markInvoicePaid(invoice.id);
                          setFormMessage('Invoice marked as paid!');
                          setTimeout(() => setFormMessage(''), 4000);
                        }}
                        className="text-green-600 hover:underline mr-2"
                        disabled={invoice.status === 'paid'}
                      >
                        Mark Paid
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this invoice?')) {
                            await removeInvoice(invoice.id);
                            setFormMessage('Invoice deleted!');
                            setTimeout(() => setFormMessage(''), 4000);
                          }
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Client Management Section
  const renderClients = () => {
    const filteredClients = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                          client.phone.includes(clientSearchTerm);
      const matchesStatus = clientFilterStatus === 'all' || client.status === clientFilterStatus;
      return matchesSearch && matchesStatus;
    });

    const handleClientSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const errors = validateForm('client', clientForm);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsSubmitting(false);
        return;
      }
      
      const clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'coachId' | 'joinDate' | 'lastSession' | 'nextSession' | 'totalRevenue' | 'sessionsCompleted' | 'preferences'> = {
        name: clientForm.name,
        email: clientForm.email,
        phone: clientForm.phone,
        address: {
          street: clientForm.street,
          street2: clientForm.street2 || undefined,
          city: clientForm.city,
          state: clientForm.state,
          zip: clientForm.zip,
          country: clientForm.country,
        },
        status: clientForm.status,
        notes: clientForm.notes || undefined,
      };

      if (editingClient) {
        await updateClient(editingClient.id, clientData);
      } else {
        await addClient({
          ...clientData,
          userId: `user-${Date.now()}`,
          coachId: user?.id || '',
          joinDate: new Date().toISOString(),
          totalRevenue: 0,
          sessionsCompleted: 0,
          preferences: {
            communicationMethod: 'email',
            sessionReminders: true,
            marketingEmails: false,
          },
        });
      }
      
      setShowAddClientModal(false);
      setEditingClient(null);
      setFormErrors({});
      setClientForm({
        name: '', email: '', phone: '', street: '', street2: '', city: '', state: '', zip: '', country: 'USA',
        status: 'active', notes: '',
      });
      setIsSubmitting(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h2>
          <button
            onClick={() => {
              setEditingClient(null);
              setClientForm({
                name: '', email: '', phone: '', street: '', street2: '', city: '', state: '', zip: '', country: 'USA',
                status: 'active', notes: '',
              });
              setShowAddClientModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Client
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clients..."
                value={clientSearchTerm}
                onChange={(e) => setClientSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={clientFilterStatus}
              onChange={(e) => setClientFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="lead">Lead</option>
              <option value="prospect">Prospect</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <div key={client.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    client.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                    client.status === 'lead' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingClient(client);
                      setClientForm({
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                        street: client.address.street,
                        street2: client.address.street2 || '',
                        city: client.address.city,
                        state: client.address.state,
                        zip: client.address.zip,
                        country: client.address.country,
                        status: client.status,
                        notes: client.notes || '',
                      });
                      setShowAddClientModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
                        await deleteClient(client.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {client.address.city}, {client.address.state}
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sessions Completed</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{client.sessionsCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${client.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
              {clientSearchTerm || clientFilterStatus !== 'all' 
                ? 'No clients match your search criteria'
                : 'No clients yet. Add your first client to get started!'}
            </div>
          )}
        </div>

        {/* Add/Edit Client Modal */}
        {showAddClientModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddClientModal(false);
                    setEditingClient(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.name}
                      onChange={(e) => {
                        setClientForm({ ...clientForm, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={clientForm.email}
                      onChange={(e) => {
                        setClientForm({ ...clientForm, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                    <select
                      value={clientForm.status}
                      onChange={(e) => setClientForm({ ...clientForm, status: e.target.value as Client['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.street}
                      onChange={(e) => setClientForm({ ...clientForm, street: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street 2</label>
                    <input
                      type="text"
                      value={clientForm.street2}
                      onChange={(e) => setClientForm({ ...clientForm, street2: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.city}
                      onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.state}
                      onChange={(e) => setClientForm({ ...clientForm, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.zip}
                      onChange={(e) => setClientForm({ ...clientForm, zip: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      value={clientForm.country}
                      onChange={(e) => setClientForm({ ...clientForm, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                  <textarea
                    value={clientForm.notes}
                    onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddClientModal(false);
                      setEditingClient(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md"
                  >
                    {isSubmitting ? 'Saving...' : editingClient ? 'Update Client' : 'Add Client'}
                  </button>
                  {Object.keys(formErrors).length > 0 && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                      {Object.values(formErrors).filter(e => e).map((error, idx) => (
                        <div key={idx}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  // Session Management Section
  const renderSessions = () => {
    const filteredSessions = sessions.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(sessionSearchTerm.toLowerCase()) ||
                          clients.find(c => c.id === session.clientId)?.name.toLowerCase().includes(sessionSearchTerm.toLowerCase());
      const matchesStatus = sessionFilterStatus === 'all' || session.status === sessionFilterStatus;
      const matchesType = sessionFilterType === 'all' || session.type === sessionFilterType;
      return matchesSearch && matchesStatus && matchesType;
    });

    const handleSessionSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const errors = validateForm('session', sessionForm);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsSubmitting(false);
        return;
      }
      
      // Calculate duration from start/end time if not provided
      let duration = sessionForm.duration;
      if (sessionForm.startTime && sessionForm.endTime) {
        const start = new Date(`${sessionForm.date}T${sessionForm.startTime}`);
        const end = new Date(`${sessionForm.date}T${sessionForm.endTime}`);
        duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
      }

      const sessionData: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'coachId'> = {
        clientId: sessionForm.clientId,
        title: sessionForm.title,
        type: sessionForm.type,
        date: sessionForm.date,
        startTime: sessionForm.startTime,
        endTime: sessionForm.endTime,
        duration: duration,
        status: sessionForm.status,
        price: sessionForm.price,
        location: sessionForm.location,
        meetingLink: sessionForm.meetingLink || undefined,
        notes: sessionForm.notes || undefined,
        goals: sessionForm.goals ? sessionForm.goals.split(',').map(g => g.trim()) : undefined,
        actionItems: sessionForm.actionItems ? sessionForm.actionItems.split(',').map(a => a.trim()) : undefined,
      };

      if (editingSession) {
        await updateSession(editingSession.id, sessionData);
      } else {
        await addSession({
          ...sessionData,
          coachId: user?.id || '',
        });
      }
      
      setShowAddSessionModal(false);
      setEditingSession(null);
      setFormErrors({});
      setSessionForm({
        clientId: '', title: '', type: 'follow-up', date: '', startTime: '', endTime: '', duration: 60,
        status: 'scheduled', price: 150, location: 'video', meetingLink: '', notes: '', goals: '', actionItems: '',
      });
      setIsSubmitting(false);
    };

    const getStatusColor = (status: Session['status']) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        case 'no-show': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'rescheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    };

    const getTypeColor = (type: Session['type']) => {
      switch (type) {
        case 'initial': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'follow-up': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'assessment': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
        case 'goal-setting': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'progress-review': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
        case 'wrap-up': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Management</h2>
          <button
            onClick={() => {
              setEditingSession(null);
              setSessionForm({
                clientId: '', title: '', type: 'follow-up', date: '', startTime: '', endTime: '', duration: 60,
                status: 'scheduled', price: 150, location: 'video', meetingLink: '', notes: '', goals: '', actionItems: '',
              });
              setShowAddSessionModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={sessionSearchTerm}
                onChange={(e) => setSessionSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={sessionFilterStatus}
              onChange={(e) => setSessionFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
            <select
              value={sessionFilterType}
              onChange={(e) => setSessionFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="initial">Initial</option>
              <option value="follow-up">Follow-up</option>
              <option value="assessment">Assessment</option>
              <option value="goal-setting">Goal Setting</option>
              <option value="progress-review">Progress Review</option>
              <option value="wrap-up">Wrap-up</option>
            </select>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow">
              {sessionSearchTerm || sessionFilterStatus !== 'all' || sessionFilterType !== 'all'
                ? 'No sessions match your search criteria'
                : 'No sessions scheduled yet. Schedule your first session to get started!'}
            </div>
          ) : (
            filteredSessions.map(session => {
              const client = clients.find(c => c.id === session.clientId);
              return (
                <div key={session.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(session.type)}`}>
                          {session.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-2" />
                          {client?.name || 'Unknown Client'}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(session.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          {session.startTime} - {session.endTime} ({session.duration} min)
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          {session.location}
                        </div>
                      </div>
                      {session.location === 'video' && session.meetingLink && (
                        <div className="mt-2">
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm"
                          >
                            Join Meeting →
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingSession(session);
                          setSessionForm({
                            clientId: session.clientId,
                            title: session.title,
                            type: session.type,
                            date: session.date.split('T')[0],
                            startTime: session.startTime,
                            endTime: session.endTime,
                            duration: session.duration,
                            status: session.status,
                            price: session.price,
                            location: session.location,
                            meetingLink: session.meetingLink || '',
                            notes: session.notes || '',
                            goals: session.goals?.join(', ') || '',
                            actionItems: session.actionItems?.join(', ') || '',
                          });
                          setShowAddSessionModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete this session?`)) {
                            await deleteSession(session.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {session.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Notes:</strong> {session.notes}
                      </p>
                    </div>
                  )}
                  {session.goals && session.goals.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Goals:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.goals.map((goal, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {session.actionItems && session.actionItems.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Action Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.actionItems.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">${session.price}</span>
                    </div>
                    {session.clientFeedback && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Client Rating:</span> {'⭐'.repeat(session.clientFeedback.rating)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add/Edit Session Modal */}
        {showAddSessionModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingSession ? 'Edit Session' : 'Schedule New Session'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddSessionModal(false);
                    setEditingSession(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSessionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client *</label>
                    <select
                      required
                      value={sessionForm.clientId}
                      onChange={(e) => setSessionForm({ ...sessionForm, clientId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={sessionForm.title}
                      onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Session title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                    <select
                      required
                      value={sessionForm.type}
                      onChange={(e) => setSessionForm({ ...sessionForm, type: e.target.value as Session['type'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="initial">Initial</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="assessment">Assessment</option>
                      <option value="goal-setting">Goal Setting</option>
                      <option value="progress-review">Progress Review</option>
                      <option value="wrap-up">Wrap-up</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                    <select
                      required
                      value={sessionForm.status}
                      onChange={(e) => setSessionForm({ ...sessionForm, status: e.target.value as Session['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                      <option value="rescheduled">Rescheduled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={sessionForm.date}
                      onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
                    <input
                      type="time"
                      required
                      value={sessionForm.startTime}
                      onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
                    <input
                      type="time"
                      required
                      value={sessionForm.endTime}
                      onChange={(e) => setSessionForm({ ...sessionForm, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={sessionForm.duration}
                      onChange={(e) => setSessionForm({ ...sessionForm, duration: parseInt(e.target.value) || 60 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                    <select
                      required
                      value={sessionForm.location}
                      onChange={(e) => setSessionForm({ ...sessionForm, location: e.target.value as Session['location'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="in-person">In Person</option>
                      <option value="video">Video</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={sessionForm.price}
                      onChange={(e) => setSessionForm({ ...sessionForm, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                {sessionForm.location === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Link</label>
                    <input
                      type="url"
                      value={sessionForm.meetingLink}
                      onChange={(e) => setSessionForm({ ...sessionForm, meetingLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                  <textarea
                    value={sessionForm.notes}
                    onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goals (comma-separated)</label>
                  <input
                    type="text"
                    value={sessionForm.goals}
                    onChange={(e) => setSessionForm({ ...sessionForm, goals: e.target.value })}
                    placeholder="Goal 1, Goal 2, Goal 3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Items (comma-separated)</label>
                  <input
                    type="text"
                    value={sessionForm.actionItems}
                    onChange={(e) => setSessionForm({ ...sessionForm, actionItems: e.target.value })}
                    placeholder="Action 1, Action 2, Action 3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddSessionModal(false);
                      setEditingSession(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md"
                  >
                    {isSubmitting ? 'Saving...' : editingSession ? 'Update Session' : 'Schedule Session'}
                  </button>
                  {Object.keys(formErrors).length > 0 && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                      {Object.values(formErrors).filter(e => e).map((error, idx) => (
                        <div key={idx}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  // Communications Section
  const renderCommunications = () => {
    const filteredComms = communications.filter(comm => {
      const matchesSearch = comm.subject.toLowerCase().includes(commSearchTerm.toLowerCase()) ||
                          comm.content.toLowerCase().includes(commSearchTerm.toLowerCase()) ||
                          clients.find(c => c.id === comm.clientId)?.name.toLowerCase().includes(commSearchTerm.toLowerCase());
      const matchesType = commFilterType === 'all' || comm.type === commFilterType;
      const matchesDirection = commFilterDirection === 'all' || comm.direction === commFilterDirection;
      const matchesStatus = commFilterStatus === 'all' || comm.status === commFilterStatus;
      return matchesSearch && matchesType && matchesDirection && matchesStatus;
    });

    const handleCommSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const errors = validateForm('communication', commForm);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsSubmitting(false);
        return;
      }
      
      const commData: Omit<Communication, 'id' | 'createdAt' | 'updatedAt' | 'coachId'> = {
        clientId: commForm.clientId,
        type: commForm.type,
        subject: commForm.subject,
        content: commForm.content,
        direction: commForm.direction,
        status: commForm.status,
        scheduledDate: commForm.scheduledDate || undefined,
      };

      if (editingComm) {
        await updateCommunication(editingComm.id, commData);
      } else {
        await addCommunication({
          ...commData,
          coachId: user?.id || '',
        });
      }
      
      setShowAddCommModal(false);
      setEditingComm(null);
      setFormErrors({});
      setCommForm({
        clientId: '', type: 'email', subject: '', content: '', direction: 'outbound', status: 'sent', scheduledDate: '',
      });
      setIsSubmitting(false);
    };

    const getCommTypeIcon = (type: Communication['type']) => {
      switch (type) {
        case 'email': return <Mail className="w-4 h-4" />;
        case 'phone': return <Phone className="w-4 h-4" />;
        case 'text': return <MessageSquare className="w-4 h-4" />;
        case 'video': return <Video className="w-4 h-4" />;
        case 'in-person': return <Users className="w-4 h-4" />;
        default: return <MessageSquare className="w-4 h-4" />;
      }
    };

    const getCommStatusColor = (status: Communication['status']) => {
      switch (status) {
        case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'read': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'scheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Communications</h2>
          <button
            onClick={() => {
              setEditingComm(null);
              setCommForm({
                clientId: '', type: 'email', subject: '', content: '', direction: 'outbound', status: 'sent', scheduledDate: '',
              });
              setShowAddCommModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Communication
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communications..."
                value={commSearchTerm}
                onChange={(e) => setCommSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={commFilterType}
              onChange={(e) => setCommFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="in-person">In Person</option>
            </select>
            <select
              value={commFilterDirection}
              onChange={(e) => setCommFilterDirection(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Directions</option>
              <option value="inbound">Inbound</option>
              <option value="outbound">Outbound</option>
            </select>
            <select
              value={commFilterStatus}
              onChange={(e) => setCommFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="read">Read</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Communications List */}
        <div className="space-y-4">
          {filteredComms.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow">
              {commSearchTerm || commFilterType !== 'all' || commFilterDirection !== 'all' || commFilterStatus !== 'all'
                ? 'No communications match your search criteria'
                : 'No communications yet. Start a conversation with your clients!'}
            </div>
          ) : (
            filteredComms.map(comm => {
              const client = clients.find(c => c.id === comm.clientId);
              return (
                <div key={comm.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          comm.direction === 'inbound' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
                        }`}>
                          {getCommTypeIcon(comm.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{comm.subject}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCommStatusColor(comm.status)}`}>
                              {comm.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              comm.direction === 'inbound' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {comm.direction}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-2" />
                          {client?.name || 'Unknown Client'}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(comm.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comm.content}</p>
                      </div>
                      {comm.attachments && comm.attachments.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {comm.attachments.map((att, idx) => (
                            <a
                              key={idx}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              <Paperclip className="w-3 h-3" />
                              {att.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingComm(comm);
                          setCommForm({
                            clientId: comm.clientId,
                            type: comm.type,
                            subject: comm.subject,
                            content: comm.content,
                            direction: comm.direction,
                            status: comm.status,
                            scheduledDate: comm.scheduledDate || '',
                          });
                          setShowAddCommModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this communication?')) {
                            await deleteCommunication(comm.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add/Edit Communication Modal */}
        {showAddCommModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingComm ? 'Edit Communication' : 'New Communication'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddCommModal(false);
                    setEditingComm(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCommSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client *</label>
                    <select
                      required
                      value={commForm.clientId}
                      onChange={(e) => setCommForm({ ...commForm, clientId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                    <select
                      required
                      value={commForm.type}
                      onChange={(e) => setCommForm({ ...commForm, type: e.target.value as Communication['type'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="text">Text</option>
                      <option value="video">Video</option>
                      <option value="in-person">In Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Direction *</label>
                    <select
                      required
                      value={commForm.direction}
                      onChange={(e) => setCommForm({ ...commForm, direction: e.target.value as Communication['direction'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="outbound">Outbound</option>
                      <option value="inbound">Inbound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                    <select
                      required
                      value={commForm.status}
                      onChange={(e) => setCommForm({ ...commForm, status: e.target.value as Communication['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="sent">Sent</option>
                      <option value="delivered">Delivered</option>
                      <option value="read">Read</option>
                      <option value="failed">Failed</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={commForm.subject}
                    onChange={(e) => setCommForm({ ...commForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Communication subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
                  <textarea
                    required
                    value={commForm.content}
                    onChange={(e) => setCommForm({ ...commForm, content: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Message content..."
                  />
                </div>
                {commForm.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scheduled Date/Time</label>
                    <input
                      type="datetime-local"
                      value={commForm.scheduledDate}
                      onChange={(e) => setCommForm({ ...commForm, scheduledDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCommModal(false);
                      setEditingComm(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : editingComm ? 'Update' : 'Send'} Communication
                  </button>
                  {Object.keys(formErrors).length > 0 && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                      {Object.values(formErrors).filter(e => e).map((error, idx) => (
                        <div key={idx}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  const renderContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content & Resources</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Jump into your learning center, coaching guide, and key workflows.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('lms')}
          className="text-left p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 transition-colors"
        >
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
          <p className="font-semibold text-gray-900 dark:text-white">Learning Hub</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage courses, lessons, and learning progress.</p>
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className="text-left p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-400 transition-colors"
        >
          <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
          <p className="font-semibold text-gray-900 dark:text-white">CoachCare Guide</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow the step-by-step walkthrough for every section.</p>
        </button>
        <button
          onClick={() => setActiveTab('communications')}
          className="text-left p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="font-semibold text-gray-900 dark:text-white">Templates & Outreach</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create client follow-ups and keep communication organized.</p>
        </button>
      </div>
    </div>
  );
  
  // User Guide Section
  const renderGuide = () => {
    const guideSteps = [
      {
        id: 'welcome',
        title: 'Welcome to CoachCare',
        icon: '👋',
        content: (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to CoachCare Portal</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Your comprehensive platform for managing clients, sessions, billing, and communications. 
                This guide will help you master every feature.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li>• Manage clients and track their progress</li>
                <li>• Schedule and manage coaching sessions</li>
                <li>• Create invoices and track billing</li>
                <li>• Communicate with clients effectively</li>
                <li>• View analytics and generate reports</li>
                <li>• Customize your portal settings</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'dashboard',
        title: 'Dashboard Overview',
        icon: '📊',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your dashboard provides a quick overview of your coaching business with key metrics and quick actions.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Metrics</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Total clients and active sessions</li>
                  <li>• Revenue and pending invoices</li>
                  <li>• Upcoming appointments</li>
                  <li>• Goal completion rates</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Add new client</li>
                  <li>• Schedule session</li>
                  <li>• Create invoice</li>
                  <li>• View analytics</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'clients',
        title: 'Client Management',
        icon: '👥',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all your clients in one place. Add, edit, search, and filter clients by status.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">Features</h3>
              <ul className="space-y-2 text-green-800 dark:text-green-200">
                <li>• Add new clients with complete contact information</li>
                <li>• Search clients by name, email, or phone</li>
                <li>• Filter by status (active, inactive, lead, prospect)</li>
                <li>• View client statistics (sessions completed, total revenue)</li>
                <li>• Edit or delete client records</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'sessions',
        title: 'Session Management',
        icon: '📅',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Schedule, track, and manage all your coaching sessions with detailed information.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">Session Types</h3>
              <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                <li>• <strong>Initial:</strong> First session with a new client</li>
                <li>• <strong>Follow-up:</strong> Regular ongoing sessions</li>
                <li>• <strong>Assessment:</strong> Progress evaluation</li>
                <li>• <strong>Goal Setting:</strong> Define and refine goals</li>
                <li>• <strong>Progress Review:</strong> Review achievements</li>
                <li>• <strong>Wrap-up:</strong> Final session</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Session Details</h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li>• Set date, time, and duration</li>
                <li>• Choose location (in-person, video, phone)</li>
                <li>• Add meeting links for video sessions</li>
                <li>• Track goals and action items</li>
                <li>• Add notes and client feedback</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'billing',
        title: 'Billing & Invoices',
        icon: '💰',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Invoices</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create invoices, track payments, and manage your billing efficiently.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Invoice Management</h3>
              <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                <li>• Create invoices for clients</li>
                <li>• Set due dates and track payment status</li>
                <li>• Mark invoices as paid</li>
                <li>• View detailed invoice information</li>
                <li>• Track total revenue and pending payments</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'communications',
        title: 'Communications',
        icon: '💬',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Communications</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Keep track of all communications with your clients across different channels.
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Communication Types</h3>
              <ul className="space-y-2 text-indigo-800 dark:text-indigo-200">
                <li>• Email communications</li>
                <li>• Phone calls</li>
                <li>• Text messages</li>
                <li>• Video calls</li>
                <li>• In-person meetings</li>
              </ul>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-3">Features</h3>
              <ul className="space-y-2 text-teal-800 dark:text-teal-200">
                <li>• Track inbound and outbound communications</li>
                <li>• Schedule future communications</li>
                <li>• Monitor delivery and read status</li>
                <li>• Search and filter by type, direction, and status</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'analytics',
        title: 'Analytics & Reports',
        icon: '📈',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gain insights into your coaching business with comprehensive analytics and reports.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Metrics</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Total revenue and pending payments</li>
                  <li>• Session completion rates</li>
                  <li>• Active vs total clients</li>
                  <li>• Goal completion statistics</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Reports</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Monthly revenue trends</li>
                  <li>• Session type breakdown</li>
                  <li>• Client status overview</li>
                  <li>• Export capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'settings',
        title: 'Settings & Customization',
        icon: '⚙️',
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings & Customization</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your portal experience with comprehensive settings options.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Available Settings</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Profile settings (name, email, phone, bio)</li>
                <li>• Notification preferences</li>
                <li>• Appearance (theme, language)</li>
                <li>• Security options (password, 2FA)</li>
                <li>• Advanced settings (auto-save, data sync)</li>
                <li>• Privacy & data retention</li>
              </ul>
            </div>
          </div>
        ),
      },
    ];

    const currentStepData = guideSteps[guideStep];
    const isFirstStep = guideStep === 0;
    const isLastStep = guideStep === guideSteps.length - 1;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Guide</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {guideStep + 1} of {guideSteps.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            {guideSteps.map((step, idx) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full ${
                  idx <= guideStep
                    ? 'bg-blue-600 dark:bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            {guideSteps.map((step) => (
              <span key={step.id} className={guideStep === guideSteps.indexOf(step) ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">{currentStepData.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentStepData.title}</h3>
          </div>
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isFirstStep
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex gap-2">
            {guideSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setGuideStep(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === guideStep
                    ? 'bg-blue-600 dark:bg-blue-500'
                    : idx < guideStep
                    ? 'bg-green-500 dark:bg-green-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                title={step.title}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setCompletedGuideSteps(new Set([...completedGuideSteps, currentStepData.id]));
              if (!isLastStep) {
                setGuideStep(guideStep + 1);
              } else {
                setActiveTab('dashboard');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {isLastStep ? 'Finish' : 'Next'}
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  };
  
  // Analytics/Reports Section
  const renderAnalytics = () => {
    // Calculate statistics
    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
    const pendingRevenue = invoices.filter(i => i.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const totalSessions = sessions.length;
    const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const totalClients = clients.length;
    const activeGoals = goals.filter(g => g.status === 'in-progress').length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const goalCompletionRate = goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;
    
    // Session type breakdown
    const sessionTypeBreakdown = sessions.reduce((acc, session) => {
      acc[session.type] = (acc[session.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly revenue (last 6 months)
    const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthSessions = sessions.filter(s => {
        const sessionDate = new Date(s.date);
        return s.status === 'completed' && sessionDate >= monthStart && sessionDate <= monthEnd;
      });
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: monthSessions.reduce((sum, s) => sum + s.price, 0),
        sessions: monthSessions.length,
      };
    }).reverse();

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              ${pendingRevenue.toLocaleString()} pending
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Session Completion</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completionRate}%</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {completedSessions} of {totalSessions} completed
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{activeClients}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {totalClients} total clients
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Goal Completion</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{goalCompletionRate}%</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {completedGoals} of {goals.length} completed
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
            <div className="space-y-3">
              {monthlyRevenue.map((month, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{month.month}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${month.revenue.toLocaleString()} ({month.sessions} sessions)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${monthlyRevenue.length > 0 ? (month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue || 1)) * 100) : 0}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Type Breakdown */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Types</h3>
            <div className="space-y-3">
              {Object.entries(sessionTypeBreakdown).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{type.replace('-', ' ')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${totalSessions > 0 ? (count / totalSessions * 100) : 0}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
              {Object.keys(sessionTypeBreakdown).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No session data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Client Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Status Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['active', 'inactive', 'lead', 'prospect'].map(status => {
              const count = clients.filter(c => c.status === status).length;
              return (
                <div key={status} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Export Sessions</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Export Clients</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Export Financials</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // About the Founder Section
  const renderAboutFounder = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About the Founder</h2>

        {/* Founder Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src="/assets/founder.png"
              alt="Brian Proctor, Founder"
              className="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-blue-200 dark:border-blue-800 shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Brian Proctor</h2>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Founder, No Window Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Brian Proctor is a business leader, training expert, and executive coach dedicated to empowering individuals and organizations. A Bethune-Cookman University graduate (Class of 2005) and Omega Psi Phi member, he specializes in professional development, leadership coaching, workforce training, and organizational growth.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                With expertise in Human Resources, executive coaching, and after-market specialization, Brian has a proven track record of enhancing leadership, improving performance, and driving career success. His hands-on experience spans corporate and blue-collar industries, providing a unique perspective on adaptability, resilience, and skill development.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                As the founder of No Window Shopping Professional Services, Brian champions his "No Window Shopping" mantra, inspiring professionals to take action, invest in themselves, and seize every opportunity. Grounded in strong family and spiritual values, he is committed to helping others develop, lead, and succeed—because success isn't on display; it's claimed.
              </p>
              
              {/* Contact Information */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">Get in Touch</h4>
                <div className="flex flex-col gap-2 text-base">
                  <span className="text-gray-700 dark:text-gray-300">
                    Email: <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">NoWindowShoppingOnline@gmail.com</a>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Instagram: <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">@DrProctorKOPV</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To inspire and equip professionals with the mindset, skills, and strategies needed to break through barriers, seize opportunities, and achieve their full potential. We believe success isn't on display—it's claimed through action, persistence, and strategic investment in oneself.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vision</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To be the leading platform for professional transformation, where individuals and organizations discover that their greatest potential lies not in what they see, but in what they're willing to pursue, develop, and achieve through dedicated effort and strategic action.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">💪</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Action Over Observation</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe in doing rather than just watching. Success comes from taking calculated risks and making strategic moves.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Continuous Learning</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Growth is a lifelong journey. We commit to constant improvement and helping others do the same.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Authentic Relationships</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We build genuine connections based on trust, transparency, and mutual respect.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Settings Section - Enhanced with full Settings features
  const renderSettings = () => {
    const applyTheme = (theme: string) => {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.remove('dark');
      } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      localStorage.setItem('theme', theme);
    };

    const handleThemeChange = (theme: string) => {
      setAppearanceSettings({ ...appearanceSettings, theme });
      applyTheme(theme);
    };

    const renderGeneralSettings = () => (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
          <select
            value={appearanceSettings.theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
          <select
            value={appearanceSettings.language}
            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, language: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
          <select
            value={appearanceSettings.timezone}
            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, timezone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
          <select
            value={appearanceSettings.dateFormat}
            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, dateFormat: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    );

    const renderAdvancedSettings = () => (
      <div className="space-y-6">
        {Object.entries(advancedSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {key === 'autoSave' && 'Automatically save your work as you type'}
                {key === 'dataSync' && 'Sync your data across all devices'}
                {key === 'analytics' && 'Help us improve by sharing usage data'}
                {key === 'debugMode' && 'Enable advanced debugging features'}
              </p>
            </div>
            <button
              onClick={() => setAdvancedSettings({ ...advancedSettings, [key]: !value })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    );

    const renderPrivacySecurity = () => (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setPrivacySettings({ ...privacySettings, twoFactorAuth: !privacySettings.twoFactorAuth })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Timeout (minutes)</label>
          <select
            value={privacySettings.sessionTimeout}
            onChange={(e) => setPrivacySettings({ ...privacySettings, sessionTimeout: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Retention (days)</label>
          <select
            value={privacySettings.dataRetention}
            onChange={(e) => setPrivacySettings({ ...privacySettings, dataRetention: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={365}>1 year</option>
            <option value={730}>2 years</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Share Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Allow us to use your data for product improvement</p>
          </div>
          <button
            onClick={() => setPrivacySettings({ ...privacySettings, shareAnalytics: !privacySettings.shareAnalytics })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacySettings.shareAnalytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacySettings.shareAnalytics ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    );

    const settingsTabs = [
      { id: 'profile', name: 'Profile', icon: User },
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'appearance', name: 'Appearance', icon: Palette },
      { id: 'advanced', name: 'Advanced', icon: SettingsIcon },
      { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    ];

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>

        {/* Settings Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSettingsTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      settingsTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="p-6">
            {settingsTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Save Profile
                </button>
              </div>
            )}
            {settingsTab === 'notifications' && (
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <button
                      onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {settingsTab === 'appearance' && renderGeneralSettings()}
            {settingsTab === 'advanced' && renderAdvancedSettings()}
            {settingsTab === 'privacy' && (
              <div className="space-y-4">
                {renderPrivacySecurity()}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  CROM Portal (CoachCare)
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Core Operations */}
            {[
              { id: 'dashboard', name: 'Dashboard', group: 'core' },
              { id: 'clients', name: 'Clients', group: 'core' },
              { id: 'sessions', name: 'Sessions', group: 'core' },
              { id: 'billing', name: 'Billing', group: 'core' },
              { id: 'communications', name: 'Communications', group: 'core' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            {/* Learning & Resources */}
            {[
              { id: 'lms', name: 'LMS', group: 'learning' },
              { id: 'content', name: 'Content/Resources', group: 'learning' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            {/* Insights */}
            {[
              { id: 'analytics', name: 'Analytics/Reports', group: 'insights' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            {/* Help & Information */}
            {[
              { id: 'guide', name: 'User Guide', group: 'help' },
              { id: 'about', name: 'About', group: 'help' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            {/* Settings */}
            {[
              { id: 'settings', name: 'Settings', group: 'settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'lms' && <LMSHub />}
          {activeTab === 'clients' && renderClients()}
          {activeTab === 'sessions' && renderSessions()}
          {activeTab === 'billing' && renderBilling()}
          {activeTab === 'communications' && renderCommunications()}
          {activeTab === 'content' && renderContent()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'guide' && renderGuide()}
          {activeTab === 'about' && renderAboutFounder()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>
      
      {/* Video Call Modal */}
      {showVideoCall && (
        <VideoCall 
          onClose={() => setShowVideoCall(false)}
          roomUrl="https://nowindowshopping.daily.co/coach-session"
        />
      )}

      {/* Video Chat Modal */}
      {showVideoChat && (
        <VideoChat
          roomUrl="https://nowindowshopping.daily.co/coaching-session"
          roomName="Coaching Session"
          sessionType="coaching"
          participants={[
            { id: '1', name: user?.name || 'Coach', role: 'coach' },
            { id: '2', name: 'Client', role: 'client' }
          ]}
          onClose={() => setShowVideoChat(false)}
          onSessionEnd={(duration) => {
            console.log(`Coaching session ended. Duration: ${duration}ms`);
            setShowVideoChat(false);
          }}
        />
      )}

      {/* Video Session Manager Modal */}
      {showVideoSessionManager && (
        <VideoSessionManager
          onClose={() => setShowVideoSessionManager(false)}
          onSessionEnd={(session, duration) => {
            console.log(`Session "${session.title}" ended. Duration: ${duration}ms`);
            setShowVideoSessionManager(false);
          }}
        />
      )}

      {/* Invoice View Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Details</h3>
              <button
                onClick={() => {
                  setShowInvoiceModal(false);
                  setSelectedInvoice(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Invoice Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInvoice.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    selectedInvoice.status === 'sent' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    selectedInvoice.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {clients.find(c => c.id === selectedInvoice.clientId)?.name || 'Unknown Client'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Items</p>
                <div className="border rounded-lg divide-y">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} × ${item.rate.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">${item.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedInvoice.total.toLocaleString()}</p>
              </div>
              {selectedInvoice.notes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notes</p>
                  <p className="text-gray-900 dark:text-white">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Center */}
      <NotificationCenter />
    </div>
  );
}; 