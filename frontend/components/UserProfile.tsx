import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { getOrders } from '../db';
import { Package, Download } from 'lucide-react';

export const UserProfile = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const downloadInvoice = (order: Order) => {
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #C9943A; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #5C0A20; text-transform: uppercase; letter-spacing: 2px; }
            .sub-logo { font-size: 14px; color: #C9943A; font-style: italic; }
            .invoice-title { font-size: 24px; margin-top: 20px; color: #333; }
            .details-container { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .details-box { background: #f9f9f9; padding: 15px; border-radius: 4px; width: 45%; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border-bottom: 1px solid #ddd; padding: 12px 8px; text-align: left; }
            th { background-color: #5C0A20; color: #FDF6E3; font-weight: normal; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
            .total-row { font-weight: bold; font-size: 18px; }
            .total-row td { border-top: 2px solid #5C0A20; border-bottom: none; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">gurupadukam</div>
            <div class="sub-logo">Organic Pooja Materials</div>
            <div class="invoice-title">TAX INVOICE</div>
          </div>
          
          <div class="details-container">
            <div class="details-box">
              <strong>Billed To:</strong><br><br>
              ${order.address.fullName}<br>
              ${order.address.street}<br>
              ${order.address.city}, ${order.address.state} - ${order.address.zip}<br>
              Phone: ${order.address.phone}
            </div>
            <div class="details-box">
              <strong>Order Details:</strong><br><br>
              Order ID: ${order.id}<br>
              Date: ${new Date(order.date).toLocaleDateString()}<br>
              Status: ${order.status}<br>
              ${order.trackingId ? `Tracking AWB: ${order.trackingId}` : ''}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>₹${item.price}</td>
                  <td style="text-align: right;">₹${item.price * item.qty}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">Grand Total:</td>
                <td style="text-align: right; color: #5C0A20;">₹${order.total}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            Thank you for choosing gurupadukam. May the divine blessings be with you.<br>
            This is a computer-generated invoice and does not require a physical signature.
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      printWindow.focus();
      // Small delay to ensure styles are applied before printing
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-[60vh]">
      <h1 className="font-cinzel text-3xl font-bold text-sindhoor mb-8 border-b border-gold/30 pb-4">My Profile</h1>
      
      <div className="bg-white border border-gold/30 shadow-md p-6 mb-8">
        <h2 className="font-cinzel text-xl font-bold text-sindhoor mb-6 flex items-center gap-2">
          <Package size={20} /> Order History
        </h2>
        
        {orders.length === 0 ? (
          <div className="text-gray-500 italic text-center py-8">You haven't placed any orders yet.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(o => (
              <div key={o.id} className="border border-gold/20 rounded p-5 bg-sandal/10 hover:bg-sandal/20 transition-colors">
                <div className="flex flex-wrap justify-between items-start mb-4 border-b border-gold/20 pb-4">
                  <div>
                    <div className="font-bold text-sindhoor font-cinzel text-lg">Order #{o.id}</div>
                    <div className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="font-bold text-xl text-sindhoor">₹{o.total}</div>
                    <div className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${o.status === 'Shipped' || o.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {o.status}
                    </div>
                    <button 
                      onClick={() => downloadInvoice(o)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline mt-1 font-cinzel font-bold"
                    >
                      <Download size={14} /> Download Invoice
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {o.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-white border border-gold/30 w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-sindhoor">{item.qty}</span>
                        <span className="text-gray-800">{item.name}</span>
                      </div>
                      <span className="text-gray-600 font-bold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
