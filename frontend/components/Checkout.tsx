import React, { useState } from 'react';
import { CartItem, Address, Order } from '../types';
import { saveOrder, saveAddress } from '../db';
import { Lock } from 'lucide-react';

export const Checkout = ({
  cart,
  clearCart,
  setRoute
}: {
  cart: CartItem[];
  clearCart: () => void;
  setRoute: (r: string) => void;
}) => {

  const [address, setAddress] = useState<Address>({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [showPayment, setShowPayment] = useState(false);
  const [utr, setUtr] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const upiId = 'yourupi@oksbi';

  const upiLink =
    `upi://pay?pa=${upiId}&pn=Gurupadukam&am=${total}&cu=INR`;

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();

    saveAddress(address);

    setShowPayment(true);
  };

  const handlePlaceOrder = () => {

    if (!utr) {
      alert('Please enter UTR number');
      return;
    }

    const order: Order = {
      id: 'ORD' + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      items: [...cart],
      total,
      address,
      status: 'Pending Verification',
      paymentMethod: 'UPI',
      utr,
    };

    saveOrder(order);

    clearCart();

    setShowPayment(false);

    setRoute('profile');

    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

      <div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-sindhoor">
            Checkout
          </h2>

          <div className="flex items-center gap-2 text-green-700 text-sm">
            <Lock size={16} />
            Secure Checkout
          </div>
        </div>

        <form onSubmit={handleProceed} className="space-y-4">

          <input
            required
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value,
              })
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            required
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({
                ...address,
                phone: e.target.value,
              })
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            required
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value,
              })
            }
            className="w-full border p-4 rounded-xl"
          />

          <div className="grid grid-cols-3 gap-4">

            <input
              required
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value,
                })
              }
              className="border p-4 rounded-xl"
            />

            <input
              required
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
              className="border p-4 rounded-xl"
            />

            <input
              required
              placeholder="PIN"
              value={address.zip}
              onChange={(e) =>
                setAddress({
                  ...address,
                  zip: e.target.value,
                })
              }
              className="border p-4 rounded-xl"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold"
          >
            Proceed to Payment
          </button>

        </form>
      </div>

      <div className="bg-white border rounded-2xl p-6 h-fit shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Order Summary
        </h2>

        <div className="space-y-4">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex justify-between"
            >
              <span>
                {item.qty} × {item.name}
              </span>

              <span>
                ₹{item.price * item.qty}
              </span>
            </div>

          ))}

        </div>

        <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

      {showPayment && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">

            <h2 className="text-3xl font-bold mb-5">
              Pay Using UPI
            </h2>

            <img
              src="/upi-qr.jpeg"
              alt="UPI QR"
              className="w-72 mx-auto rounded-2xl shadow-xl"
            />

            <p className="mt-5 text-lg font-semibold">
              UPI ID: '9494446479@ptyes'
            </p>

            <a
              href={upiLink}
              className="block bg-black text-white py-4 rounded-xl mt-5 font-bold"
            >
              Pay ₹{total} Using UPI
            </a>

            <input
              type="text"
              placeholder="Enter UTR Number"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              className="w-full border p-4 rounded-xl mt-5"
            />

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-sindhoor text-white py-4 rounded-xl mt-4 font-bold"
            >
              Place Order
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="mt-4 text-gray-500 underline"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
