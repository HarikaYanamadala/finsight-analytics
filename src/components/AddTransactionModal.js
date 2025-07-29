// src/components/AddTransactionModal.js
import React from "react";

export default function AddTransactionModal({
  category, setCategory,
  date, setDate,
  amount, setAmount,
  description, setDescription,
  notes, setNotes,
  handleSubmit,
  setModalOpen
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#232c44] p-8 rounded-xl shadow-lg w-[90vw] max-w-md text-gray-100 relative border-2 border-orange-400">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
          onClick={() => setModalOpen(false)}
          aria-label="Close"
        >×</button>
        <h2 className="text-2xl font-bold mb-6 text-orange-400">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-[#161d2d] text-gray-100 border border-indigo-500 focus:outline-none"
              required
            >
              <option value="">Select</option>
              <option value="Groceries">Groceries</option>
              <option value="Transport">Transport</option>
              <option value="Housing">Housing</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-2 rounded bg-[#161d2d] text-gray-100 border border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full p-2 rounded bg-[#161d2d] text-gray-100 border border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-[#161d2d] text-gray-100 border border-indigo-500 focus:outline-none"
              required
              placeholder="eg. Amazon, Groceries"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Notes</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-2 rounded bg-[#161d2d] text-gray-100 border border-indigo-500 focus:outline-none"
              placeholder="Optional notes"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 hover:scale-105 text-white py-2 rounded mt-2 font-bold transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
