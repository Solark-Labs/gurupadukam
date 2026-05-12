import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { getOrders, updateOrderStatus } from '../db';
import { Shield, Truck } from 'lucide-react';

export const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleShip = (id: string) => {
    const trackingId = 'SR' + Math.floor(Math.random() * 100000000);
    updateOrderStatus(id, 'Shipped', trackingId);
    setOrders(getOrders()); // refresh
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-sindhoor" size={32} />
        <h1 className="font-cinzel text-3xl font-bold text-sindhoor">Admin Dashboard</h1>
      </div>

      <div className="bg-white border border-gold/30 shadow-md overflow-hidden">
        <div className="bg-sindhoor text-sandal p-4 font-cinzel font-bold flex justify-between items-center">
          <span>Recent Orders</span>
          <span className="text-sm font-normal bg-gold text-sindhoorDark px-2 py-1 rounded">Shiprocket Integrated</span>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 italic">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sandal/50 border-b border-gold/20 text-sindhoor font-cinzel text-sm">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gold/10 hover:bg-sandal/20">
                    <td className="p-4 font-bold text-sindhoor">{o.id}</td>
                    <td className="p-4 text-sm text-gray-600">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-bold">{o.address.fullName}</div>
                      <div className="text-xs text-gray-500">{o.address.city}, {o.address.state}</div>
                    </td>
                    <td className="p-4 font-bold">₹{o.total}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${o.status === 'Shipped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {o.status}
                      </span>
                      {o.trackingId && <div className="text-[10px] text-gray-500 mt-1">AWB: {o.trackingId}</div>}
                    </td>
                    <td className="p-4">
                      {o.status === 'Processing' && (
                        <button onClick={() => handleShip(o.id)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          <Truck size={14} /> Ship via Shiprocket
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};