import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaPlay } from 'react-icons/fa6';
import {
  getAllRaffles,
  createRaffle,
  updateRaffle,
  getEntriesForRaffle,
  updateRaffleEntry,
} from './raffleService';
import type { Raffle, RaffleEntry } from './types';

const RaffleAdmin: React.FC = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRaffle, setEditingRaffle] = useState<Raffle | null>(null);
  const [entriesFor, setEntriesFor] = useState<Raffle | null>(null);
  const [entries, setEntries] = useState<RaffleEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [processingWinner, setProcessingWinner] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    pricePerTicket: 1000,
    durationDays: 7,
    winnerCount: 1,
  });

  useEffect(() => {
    getAllRaffles().then(setRaffles).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!entriesFor) return;
    setEntriesLoading(true);
    getEntriesForRaffle(entriesFor.id).then(setEntries).finally(() => setEntriesLoading(false));
  }, [entriesFor?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const now = new Date();
      const endsAt = new Date(now);
      endsAt.setDate(endsAt.getDate() + formData.durationDays);
      if (editingRaffle) {
        await updateRaffle(editingRaffle.id, {
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          pricePerTicket: formData.pricePerTicket,
          winnerCount: formData.winnerCount,
        });
        setEditingRaffle(null);
      } else {
        await createRaffle({
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          pricePerTicket: formData.pricePerTicket,
          durationDays: formData.durationDays,
          startsAt: now,
          endsAt,
          winnerCount: formData.winnerCount,
          status: 'active',
        });
      }
      setFormData({ title: '', description: '', imageUrl: '', pricePerTicket: 1000, durationDays: 7, winnerCount: 1 });
      setShowForm(false);
      const updated = await getAllRaffles();
      setRaffles(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (r: Raffle) => {
    const startsAt = r.startsAt instanceof Date ? r.startsAt : new Date((r.startsAt as { seconds: number }).seconds * 1000);
    const endsAt = r.endsAt instanceof Date ? r.endsAt : new Date((r.endsAt as { seconds: number }).seconds * 1000);
    const durationDays = Math.ceil((endsAt.getTime() - startsAt.getTime()) / (24 * 60 * 60 * 1000));
    setFormData({
      title: r.title,
      description: r.description,
      imageUrl: r.imageUrl,
      pricePerTicket: r.pricePerTicket,
      durationDays,
      winnerCount: r.winnerCount,
    });
    setEditingRaffle(r);
    setShowForm(true);
  };

  const handleMarkInvalid = async (entryId: string) => {
    if (!window.confirm('Mark this entry as invalid?')) return;
    await updateRaffleEntry(entryId, { status: 'invalid' });
    if (entriesFor) {
      const updated = await getEntriesForRaffle(entriesFor.id);
      setEntries(updated);
    }
  };

  const handleAddFraudFlag = async (entryId: string) => {
    const reason = window.prompt('Fraud flag reason:');
    if (!reason?.trim()) return;
    const entry = entries.find((e) => e.id === entryId);
    const existing = entry?.fraudFlags || [];
    await updateRaffleEntry(entryId, { fraudFlags: [...existing, reason.trim()] });
    if (entriesFor) {
      const updated = await getEntriesForRaffle(entriesFor.id);
      setEntries(updated);
    }
  };

  const handleTriggerWinnerSelection = async () => {
    if (!entriesFor || !window.confirm('Manually trigger winner selection for this raffle?')) return;
    setProcessingWinner(true);
    try {
      const res = await fetch('/api/raffle/process-ended', { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      const updated = await getAllRaffles();
      setRaffles(updated);
      const r = updated.find((x) => x.id === entriesFor.id);
      if (r) setEntriesFor(r);
    } catch {
      alert('Failed to trigger. Ensure CRON_SECRET is set if required.');
    } finally {
      setProcessingWinner(false);
    }
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const formatDate = (d: Date | { seconds: number } | undefined) =>
    d ? (d instanceof Date ? d : new Date(d.seconds * 1000)).toLocaleString() : '-';

  const canEdit = (r: Raffle) => r.status === 'draft' || (r.status === 'active' && new Date() < (r.startsAt instanceof Date ? r.startsAt : new Date((r.startsAt as { seconds: number }).seconds * 1000)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/raffle"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
            Back to Raffles
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Raffle Admin</h1>

        {!showForm ? (
          <button
            onClick={() => {
              setEditingRaffle(null);
              setFormData({ title: '', description: '', imageUrl: '', pricePerTicket: 1000, durationDays: 7, winnerCount: 1 });
              setShowForm(true);
            }}
            className="mb-8 flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <FaPlus className="w-5 h-5" />
            Create Raffle
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {editingRaffle ? 'Edit Raffle' : 'New Raffle'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g. Air Jordan 1 Shattered Backboard"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Describe the item..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (cents)</label>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={formData.pricePerTicket}
                    onChange={(e) => setFormData({ ...formData, pricePerTicket: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formatPrice(formData.pricePerTicket)} per ticket</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (days)</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Winner count</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.winnerCount}
                    onChange={(e) => setFormData({ ...formData, winnerCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingRaffle ? 'Save' : 'Create Raffle'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingRaffle(null);
                }}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {entriesFor && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Entries: {entriesFor.title}
              </h2>
              <div className="flex gap-2">
                {(entriesFor.status === 'active' || entriesFor.status === 'cooldown') && (
                  <button
                    onClick={handleTriggerWinnerSelection}
                    disabled={processingWinner}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm flex items-center gap-2"
                  >
                    <FaPlay className="w-4 h-4" />
                    {processingWinner ? 'Processing...' : 'Trigger Winner Selection'}
                  </button>
                )}
                <button
                  onClick={() => setEntriesFor(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            {entriesLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Tickets</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Amount</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Purchased</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{e.email}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{e.displayName || '-'}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{e.ticketCount}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{formatPrice(e.amountPaid)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded ${
                            e.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30' :
                            e.status === 'invalid' ? 'bg-red-100 dark:bg-red-900/30' :
                            'bg-gray-200 dark:bg-gray-600'
                          }`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-sm">
                          {formatDate(e.purchasedAt)}
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          {e.status === 'paid' && (
                            <>
                              <button
                                onClick={() => handleMarkInvalid(e.id)}
                                className="text-red-600 dark:text-red-400 hover:underline text-sm"
                              >
                                Mark invalid
                              </button>
                              <button
                                onClick={() => handleAddFraudFlag(e.id)}
                                className="text-amber-600 dark:text-amber-400 hover:underline text-sm"
                              >
                                Add fraud flag
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <p className="p-8 text-gray-500 dark:text-gray-400 text-center">No entries yet.</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white p-4 border-b border-gray-200 dark:border-gray-700">
            All Raffles
          </h2>
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto" />
            </div>
          ) : raffles.length === 0 ? (
            <p className="p-8 text-gray-500 dark:text-gray-400">No raffles yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Ends</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {raffles.map((r) => {
                    const endsAt = r.endsAt instanceof Date ? r.endsAt : new Date((r.endsAt as { seconds: number }).seconds * 1000);
                    return (
                      <tr key={r.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{r.title}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600">{r.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{formatPrice(r.pricePerTicket)}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{endsAt.toLocaleDateString()}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <Link
                            to={`/raffle/${r.id}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => setEntriesFor(r)}
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                          >
                            Entries
                          </button>
                          {canEdit(r) && (
                            <button
                              onClick={() => handleEdit(r)}
                              className="text-amber-600 dark:text-amber-400 hover:underline text-sm"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaffleAdmin;
