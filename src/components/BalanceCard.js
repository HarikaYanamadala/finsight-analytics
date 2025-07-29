// src/components/BalanceCard.js
import React from "react";
export default function BalanceCard({ totalBalance }) {
  return (
    <div className="bg-gradient-to-r from-[#222b48] to-[#20273a] px-8 py-4 rounded-xl shadow-lg text-2xl font-bold flex-1 border-l-4 border-orange-400">
      Total Balance:&nbsp;
      <span className={`ml-2 font-extrabold ${totalBalance < 0 ? 'text-red-400' : 'text-indigo-400'}`}>
        ₹{totalBalance}
      </span>
    </div>
  );
}
