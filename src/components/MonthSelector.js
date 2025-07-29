// src/components/MonthSelector.js
import React from "react";
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export default function MonthSelector({ activeMonth, setActiveMonth, activeYear, setActiveYear }) {
  return (
    <div className="flex flex-row items-center gap-4 mb-3">
      <button onClick={() => setActiveYear(activeYear - 1)} className="text-indigo-400 px-2 text-2xl hover:text-indigo-300">{'<'}</button>
      {MONTHS.map((m, idx) => (
        <button
          key={m}
          className={`px-3 py-1 mx-1 rounded-lg font-bold text-sm transition 
            ${idx === activeMonth ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-[#101626]' : 'text-indigo-200 hover:bg-[#232d4d]'}`}
          onClick={() => setActiveMonth(idx)}
        >{m.slice(0, 3)}</button>
      ))}
      <button onClick={() => setActiveYear(activeYear + 1)} className="text-indigo-400 px-2 text-2xl hover:text-indigo-300">{'>'}</button>
      <span className="ml-2 text-indigo-200 font-bold">{activeYear}</span>
    </div>
  );
}
