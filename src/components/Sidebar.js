// src/components/Sidebar.js
import React from "react";
export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-[#151c2c] flex-shrink-0 md:h-screen md:fixed top-0 left-0 flex md:flex-col border-r border-[#232d4d]">
      <div className="p-6 text-3xl font-bold tracking-wide" style={{ color: '#ff9500' }}>
        FinSight
      </div>
      <nav className="flex md:flex-col gap-2 p-4">
        <a href="#" className="rounded px-4 py-2 text-left text-[#dee3ec] hover:text-indigo-300 hover:bg-[#212c4b] font-semibold">Dashboard</a>
        <a href="#" className="rounded px-4 py-2 text-left text-[#dee3ec] hover:text-indigo-300 hover:bg-[#212c4b] font-semibold">Transactions</a>
        <a href="#" className="rounded px-4 py-2 text-left text-[#dee3ec] hover:text-indigo-300 hover:bg-[#212c4b] font-semibold">Analytics</a>
      </nav>
    </aside>
  );
}
