import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaMagnifyingGlass, 
  FaFilter, 
  FaPenNib as FaPen, 
  FaTrash as FaTrash, 
  FaTag, 
  FaCircleCheck, 
  FaCircleXmark, 
  FaImage, 
  FaArrowRight
} from 'react-icons/fa6';
import { 
  getAllItems, 
  createItem, 
  updateItem, 
  deleteItem, 
  uploadItemImage,
  WebstoreItem,
  ItemStatus,
  ItemType,
  recordSale
} from '../webstoreService';

const InventoryManager: React.FC = () => {
  const [items, setItems] = useState<WebstoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<WebstoreItem | null>(null);
  const [formData, setFormData] = useState<Partial<WebstoreItem>>({
    type: 'sneaker',
    title: '',
    slug: '',
    brand: '',
    size: '',
    condition: '10',
    box: true,
    tags: [],
    purchasePrice: 0,
    listPrice: 0,
    status: 'SELL',
    storageLocation: '',
    notes: '',
    images: []
  });
  
  // Sale state
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleItem, setSaleItem] = useState<WebstoreItem | null>(null);
  const [saleData, setSaleData] = useState({
    platform: 'NWS' as any,
    salePrice: 0,
    fees: 0,
    buyerEmail: ''
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
      const finalData = { ...formData, slug } as any;
      
      if (editingItem) {
        await updateItem(editingItem.id, finalData);
      } else {
        await createItem(finalData);
      }
      
      setShowForm(false);
      setEditingItem(null);
      loadItems();
    } catch (err) {
      console.error('Failed to save item:', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const url = await uploadItemImage(itemId, file);
      const item = items.find(i => i.id === itemId);
      if (item) {
        const updatedImages = [...(item.images || []), url];
        await updateItem(itemId, { images: updatedImages });
        loadItems();
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleItem) return;
    
    try {
      const netProfit = saleData.salePrice - saleItem.purchasePrice - saleData.fees;
      await recordSale({
        itemId: saleItem.id,
        platform: saleData.platform,
        salePrice: saleData.salePrice,
        fees: saleData.fees,
        netProfit,
        buyerEmail: saleData.buyerEmail,
        soldAt: new Date()
      });
      
      setShowSaleModal(false);
      setSaleItem(null);
      loadItems();
    } catch (err) {
      console.error('Failed to record sale:', err);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Manager</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              type: 'sneaker',
              title: '',
              brand: '',
              size: '',
              condition: '10',
              box: true,
              tags: [],
              purchasePrice: 0,
              listPrice: 0,
              status: 'SELL',
              storageLocation: '',
              notes: '',
              images: []
            });
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          Add Item
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="sneaker">Sneakers</option>
            <option value="funko">Funko</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="KEEP">Keep</option>
            <option value="SELL">Sell</option>
            <option value="LISTED">Listed</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Item</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Cost/List</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                    <p className="mt-2">Loading inventory...</p>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No items found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                          {item.images?.[0] ? (
                            <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <FaImage className="text-gray-400 text-xl" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.brand} {item.size && `| Size ${item.size}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 capitalize">{item.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.status === 'KEEP' ? 'bg-gray-100 text-gray-600' :
                        item.status === 'SELL' ? 'bg-blue-100 text-blue-600' :
                        item.status === 'LISTED' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-500">Cost: ${item.purchasePrice}</p>
                        <p className="font-semibold text-gray-900">List: ${item.listPrice}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{item.storageLocation || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setFormData(item);
                            setShowForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaPen />
                        </button>
                        {item.status !== 'SOLD' && (
                          <button
                            onClick={() => {
                              setSaleItem(item);
                              setSaleData({
                                platform: 'NWS',
                                salePrice: item.listPrice,
                                fees: 0,
                                buyerEmail: ''
                              });
                              setShowSaleModal(true);
                            }}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Mark Sold"
                          >
                            <FaCircleCheck />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this item?')) {
                              deleteItem(item.id).then(loadItems);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <FaCircleXmark className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ItemType })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="sneaker">Sneaker</option>
                    <option value="funko">Funko</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ItemStatus })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="KEEP">Keep</option>
                    <option value="SELL">Sell</option>
                    <option value="LISTED">Listed</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g. Jordan 1 Retro High OG"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Nike"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size (if sneaker)</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="10.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">List Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.listPrice}
                    onChange={(e) => setFormData({ ...formData, listPrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition (1-10)</label>
                  <input
                    type="text"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="DS / 9.5 / 10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                  <input
                    type="text"
                    value={formData.storageLocation}
                    onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Bin A / Shelf 2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Payment Link URL</label>
                  <input
                    type="url"
                    value={formData.stripePaymentLinkUrl || ''}
                    onChange={(e) => setFormData({ ...formData, stripePaymentLinkUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://buy.stripe.com/..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
              
              {editingItem && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, editingItem.id)}
                    className="text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sale Modal */}
      {showSaleModal && saleItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Record Sale</h3>
              <p className="text-sm text-gray-500">{saleItem.title}</p>
            </div>
            <form onSubmit={handleRecordSale} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={saleData.platform}
                  onChange={(e) => setSaleData({ ...saleData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="NWS">NWS Store</option>
                  <option value="EBAY">eBay</option>
                  <option value="STOCKX">StockX</option>
                  <option value="WHATNOT">Whatnot</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
                <input
                  type="number"
                  required
                  value={saleData.salePrice}
                  onChange={(e) => setSaleData({ ...saleData, salePrice: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fees ($)</label>
                <input
                  type="number"
                  value={saleData.fees}
                  onChange={(e) => setSaleData({ ...saleData, fees: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Email (Optional)</label>
                <input
                  type="email"
                  value={saleData.buyerEmail}
                  onChange={(e) => setSaleData({ ...saleData, buyerEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Net Profit:</span>
                  <span className="font-bold text-blue-700">
                    ${(saleData.salePrice - saleItem.purchasePrice - saleData.fees).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSaleModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Confirm Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManager;
