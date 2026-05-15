import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaFilter, 
  FaMagnifyingGlass, 
  FaTag, 
  FaCircleInfo, 
  FaBoxesStacked, 
  FaStore, 
  FaUserTie
} from 'react-icons/fa6';
import { getListedItems, WebstoreItem, ItemType } from './webstoreService';

const WebStore: React.FC = () => {
  const [items, setItems] = useState<WebstoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<ItemType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, [filterType]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getListedItems(filterType === 'all' ? undefined : filterType);
      setItems(data);
    } catch (err) {
      console.error('Failed to load shop items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Shop Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <Link to="/hub" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaArrowLeft className="text-gray-600" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <FaStore className="text-blue-600" />
                NWS SHOP
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                to="/webstore/admin" 
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Admin Portal"
              >
                <FaUserTie className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Categories */}
      <section className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">LIQUIDATION SALE</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            High-end sneakers and rare collectibles. Priced to move. Once they're gone, they're gone.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <CategoryButton 
              active={filterType === 'all'} 
              onClick={() => setFilterType('all')}
              label="All Items" 
            />
            <CategoryButton 
              active={filterType === 'sneaker'} 
              onClick={() => setFilterType('sneaker')}
              label="Sneakers" 
            />
            <CategoryButton 
              active={filterType === 'funko'} 
              onClick={() => setFilterType('funko')}
              label="Funko Pop" 
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sneakers, brands, or collectibles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBoxesStacked className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2026 No Window Shopping. All sales final on liquidation items.
          </p>
        </div>
      </footer>
    </div>
  );
};

const CategoryButton = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const ProductCard = ({ item }: { item: WebstoreItem }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/webstore/${item.slug}`)}
      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        {item.images?.[0] ? (
          <img 
            src={item.images[0]} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <FaStore className="text-6xl" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
            {item.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            {item.brand || 'Collectible'}
          </p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
            {item.title}
          </h3>
          {item.styleId && (
            <p className="text-xs text-gray-500 mt-1 font-semibold">Style ID: {item.styleId}</p>
          )}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 font-medium">Price</p>
            <p className="text-xl font-black text-gray-900">${item.listPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium">Size</p>
            <p className="text-sm font-bold text-gray-900">{item.size || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebStore;
