import React, { useState } from 'react';
import { getOrders } from '../db';
import { Order } from '../types';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export const TrackShipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!searchQuery.trim()) return;

    const orders = getOrders();
    // Search by Order ID or Tracking ID
    const found = orders.find(o => 
      o.id.toLowerCase() === searchQuery.toLowerCase() || 
      o.trackingId?.toLowerCase() === searchQuery.toLowerCase()
    );

    if (found) {
      setOrder(found);
    } else {
      setError('No order found with that ID or Tracking Number.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-sindhoor mb-4">Track Your Shipment</h1>
        <p className="font-garamond text-lg text-sindhoor/70 italic">Enter your Order ID or AWB Tracking Number to see the status.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2 mb-12">
        <input 
          type="text" 
          placeholder="e.g., ORD123456 or SR98765432" 
          className="flex-1 p-4 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor font-cinzel text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-sindhoor text-goldLight px-6 py-4 hover:bg-sindhoorDark transition-colors flex items-center gap-2 font-cinzel font-bold">
          <Search size={20} /> <span className="hidden sm:inline">Track</span>
        </button>
      </form>

      {error && (
        <div className="text-center text-red-600 font-cinzel bg-red-50 p-4 border border-red-200 rounded max-w-xl mx-auto">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-white border border-gold/30 shadow-lg p-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-between items-center border-b border-gold/20 pb-6 mb-8">
            <div>
              <div className="font-cinzel text-sm text-gray-500">Order ID</div>
              <div className="font-bold text-xl text-sindhoor">{order.id}</div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <div className="font-cinzel text-sm text-gray-500">Order Date</div>
              <div className="font-bold text-sindhoor">{new Date(order.date).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Stepper */}
          <div className="relative flex justify-between items-center mb-12 px-4 sm:px-12">
            <div className="absolute left-12 right-12 top-1/2 h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className={`absolute left-12 top-1/2 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-500 ${
              order.status === 'Processing' ? 'w-0' : 
              order.status === 'Shipped' ? 'w-1/2' : 'w-full'
            }`}></div>

            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${order.status ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                <Package size={20} />
              </div>
              <span className="font-cinzel text-xs font-bold text-sindhoor">Processing</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                <Truck size={20} />
              </div>
              <span className="font-cinzel text-xs font-bold text-sindhoor">Shipped</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${order.status === 'Delivered' ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                <CheckCircle size={20} />
              </div>
              <span className="font-cinzel text-xs font-bold text-sindhoor">Delivered</span>
            </div>
          </div>

          <div className="bg-sandal/20 p-6 border border-gold/20 rounded">
            <h3 className="font-cinzel font-bold text-sindhoor mb-4">Shipment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Status</div>
                <div className="font-bold text-lg flex items-center gap-2">
                  {order.status === 'Processing' && <Clock className="text-yellow-600" size={20}/>}
                  {order.status === 'Shipped' && <Truck className="text-blue-600" size={20}/>}
                  {order.status === 'Delivered' && <CheckCircle className="text-green-600" size={20}/>}
                  {order.status}
                </div>
              </div>
              {order.trackingId && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Tracking Number (AWB)</div>
                  <div className="font-bold text-lg text-blue-600">{order.trackingId}</div>
                  <div className="text-xs text-gray-500 mt-1">Carrier: Shiprocket</div>
                </div>
              )}
              <div className="sm:col-span-2">
                <div className="text-sm text-gray-500 mb-1">Shipping Address</div>
                <div className="font-garamond text-sindhoor">
                  {order.address.fullName}<br/>
                  {order.address.street}, {order.address.city}<br/>
                  {order.address.state} - {order.address.zip}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
