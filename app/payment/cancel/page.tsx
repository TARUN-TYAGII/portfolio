"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function PaymentCancel() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010206] to-[#0A1128] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center text-white"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <X className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-300 mb-6">No worries! You can try again anytime.</p>
        <p className="text-sm text-gray-400">Redirecting to home page in 5 seconds...</p>
      </motion.div>
    </div>
  );
}