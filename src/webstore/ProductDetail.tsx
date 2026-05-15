import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCartShopping, 
  FaTruckFast, 
  FaShield as FaShieldCheck, 
  FaCircleCheck, 
  FaImage, 
  FaArrowRight, 
  FaStore
} from 'react-icons/fa6';
import { getItemBySlug, WebstoreItem } from './webstoreService';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<WebstoreItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      loadItem(slug);
    }
  }, [slug]);

  const loadItem = async (slug: string) => {
    setLoading(true);
    try {
      const data = await getItemBySlug(slug);
      setItem(data);
    } catch (err) {
      console.error('Failed to load product detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!item) return;
    setCheckoutError(null);
    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/stripe/create-webstore-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          slug: item.slug,
          title: item.title,
          size: item.size,
          imageUrl: item.images?.[0],
          listPrice: item.listPrice,
          quantity: 1,
          includeInsurance,
          successUrl: `${window.location.origin}/webstore/${item.slug}?success=true`,
          cancelUrl: `${window.location.origin}/webstore/${item.slug}?canceled=true`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Unable to start checkout');
      }

      window.location.href = result.url as string;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to start checkout';
      setCheckoutError(message);
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/webstore" className="text-blue-600 hover:underline">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Detail Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/webstore')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-sm font-bold text-gray-600"
            >
              <FaArrowLeft />
              BACK
            </button>
            <div className="flex items-center gap-2">
              <FaStore className="text-blue-600" />
              <span className="font-black text-gray-900 tracking-tighter">NWS SHOP</span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              {item.images?.[activeImage] ? (
                <img 
                  src={item.images[activeImage]} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <FaImage className="text-8xl" />
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-20 w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${item.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {item.brand || 'Collectible'}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {item.type}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
                {item.title}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-gray-900">${item.listPrice}</span>
                <span className="text-green-600 text-sm font-bold uppercase tracking-wider">In Stock</span>
              </div>
            </div>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <SpecBox label="Size" value={item.size || 'N/A'} />
              <SpecBox label="Style ID" value={item.styleId || 'N/A'} />
              <SpecBox label="Condition" value={`${item.condition}/10`} />
              <SpecBox label="Box Included" value={item.box ? 'Yes' : 'No'} />
              <SpecBox label="Storage ID" value={item.storageLocation || 'NWS-001'} />
            </div>

            {/* Description / Notes */}
            <div className="mb-10">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.notes || "This is a liquidation item from the No Window Shopping collection. All items are authenticated and inspected for quality before listing."}
              </p>
            </div>

            {/* Buy Button */}
            <div className="mt-auto space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span>Item price</span>
                  <span>${item.listPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span>Shipping</span>
                  <span>$10</span>
                </div>
                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Add shipping insurance
                  </span>
                  <span>$5</span>
                </label>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-base font-black text-gray-900">
                  <span>Subtotal before tax</span>
                  <span>${item.listPrice + 10 + (includeInsurance ? 5 : 0)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Tax is calculated at checkout from your billing state.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaCartShopping />
                {checkoutLoading ? 'STARTING CHECKOUT...' : 'BUY NOW (QTY 1)'}
                <FaArrowRight className="text-sm opacity-50" />
              </button>
              {checkoutError && (
                <p className="text-sm text-red-600 font-medium text-center">{checkoutError}</p>
              )}
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2">
                <TrustBadge icon={<FaShieldCheck />} label="Verified" />
                <TrustBadge icon={<FaTruckFast />} label="Fast Ship" />
                <TrustBadge icon={<FaCircleCheck />} label="Authentic" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SpecBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const TrustBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center justify-center py-3 bg-gray-50 rounded-xl border border-gray-100">
    <div className="text-blue-600 mb-1">{icon}</div>
    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{label}</span>
  </div>
);

export default ProductDetail;
