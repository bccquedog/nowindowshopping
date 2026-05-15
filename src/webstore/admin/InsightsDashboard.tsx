import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, 
  FaMoneyBillTrendUp, 
  FaArrowTrendUp, 
  FaSkullCrossbones, 
  FaCircleInfo 
} from 'react-icons/fa6';
import { getAllItems, getSales, WebstoreItem, SaleRecord } from '../webstoreService';

const InsightsDashboard: React.FC = () => {
  const [items, setItems] = useState<WebstoreItem[]>([]);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Debt target state (manual input)
  const [debtTarget, setDebtTarget] = useState(() => {
    const saved = localStorage.getItem('nws_debt_target');
    return saved ? parseFloat(saved) : 5000;
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [itemsData, salesData] = await Promise.all([
        getAllItems(),
        getSales()
      ]);
      setItems(itemsData);
      setSales(salesData);
    } catch (err) {
      console.error('Failed to load insights data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDebtTarget = () => {
    const newVal = prompt('Enter your remaining debt target ($):', debtTarget.toString());
    if (newVal && !isNaN(parseFloat(newVal))) {
      const val = parseFloat(newVal);
      setDebtTarget(val);
      localStorage.setItem('nws_debt_target', val.toString());
    }
  };

  // Calculations
  const totalListedValue = items
    .filter(i => i.status === 'LISTED')
    .reduce((sum, i) => sum + i.listPrice, 0);

  const totalSoldNetProfit = sales.reduce((sum, s) => sum + s.netProfit, 0);

  const last30DaysProfit = sales
    .filter(s => {
      const date = s.soldAt instanceof Date ? s.soldAt : new Date(s.soldAt.seconds * 1000);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return date >= thirtyDaysAgo;
    })
    .reduce((sum, s) => sum + s.netProfit, 0);

  const progressPercent = Math.min(100, (totalSoldNetProfit / (totalSoldNetProfit + debtTarget)) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Debt Kill Switch Dashboard</h2>
        <button 
          onClick={handleUpdateDebtTarget}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Update Debt Target
        </button>
      </div>

      {/* Debt Progress Bar */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <FaSkullCrossbones className="text-8xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Mission Progress</p>
              <h3 className="text-4xl font-black mt-1">GET IN THE BLACK</h3>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Remaining Debt</p>
              <p className="text-3xl font-bold text-red-400">${debtTarget.toLocaleString()}</p>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-6 mb-2 overflow-hidden border border-gray-700">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-500 h-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>$0 PROFIT</span>
            <span className="text-green-400">{progressPercent.toFixed(1)}% COMPLETE</span>
            <span>DEBT FREE</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Listed Value" 
          value={`$${totalListedValue.toLocaleString()}`}
          subtitle="Inventory ready to flip"
          icon={<FaBoxesStacked className="text-blue-500" />}
        />
        <StatCard 
          title="Net Profit (30 Days)" 
          value={`$${last30DaysProfit.toLocaleString()}`}
          subtitle="Last 30 days performance"
          icon={<FaMoneyBillTrendUp className="text-green-500" />}
        />
        <StatCard 
          title="Total Net Profit" 
          value={`$${totalSoldNetProfit.toLocaleString()}`}
          subtitle="All-time liquidation profit"
          icon={<FaArrowTrendUp className="text-purple-500" />}
        />
        <StatCard 
          title="Items Sold" 
          value={sales.length.toString()}
          subtitle="Successful transactions"
          icon={<FaChartLine className="text-orange-500" />}
        />
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Liquidation Events</h3>
          <FaCircleInfo className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Sale Price</th>
                <th className="px-6 py-4">Fees</th>
                <th className="px-6 py-4">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.slice(0, 10).map((sale) => {
                const date = sale.soldAt instanceof Date ? sale.soldAt : new Date(sale.soldAt.seconds * 1000);
                return (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded uppercase">
                        {sale.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${sale.salePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-500">
                      -${sale.fees.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                      +${sale.netProfit.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                    No sales recorded yet. Start flipping!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900 mb-1">{value}</h4>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg text-xl">
      {icon}
    </div>
  </div>
);

const FaBoxesStacked = ({ className }: { className?: string }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 150.9C37.4 147 32 138.5 32 129.1s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.9 32 265.4 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 171.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.9 32 393.4 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2z"></path>
  </svg>
);

export default InsightsDashboard;
