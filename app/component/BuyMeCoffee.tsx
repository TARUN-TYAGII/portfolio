"use client";

import { useState } from 'react';
import { Coffee } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BuyMeCoffee() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await loadRazorpay();
      
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5,
        }),
      });

      const data = await response.json();

      if (!data.order) {
        toast.error('Something went wrong');
        return;
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Buy Me a Coffee',
        description: 'Support my work!',
        order_id: data.order.id,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        handler: async (response: any) => {
          // console.log("response line 68", response);
          
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            // console.log("verifyData line 85", verifyData);
            

            if (verifyData.verified) {
              router.push('/payment/success');
            } else {
              router.push('/payment/cancel');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#5c3a11',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-800 to-yellow-900 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50"
    >
      <Coffee className="w-5 h-5" />
      <span>{loading ? 'Processing...' : 'Buy me a coffee'}</span>
    </button>
  );
}