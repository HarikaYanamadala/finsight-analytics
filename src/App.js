import React, { useState } from "react";
import "./index.css";
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend
} from "recharts";
import { FaEdit } from "react-icons/fa";

const CATEGORY_COLORS = [
  "#6366f1", // indigo
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#fbbf24", // amber
  "#ff9500", // orange
  "#a21caf", // violet
  "#ef4444", // red
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const defaultTransactions = [
  { category: "Groceries", date: "2025-07-25", amount: 2000, description: "Grocery", notes: "Vegetables" },
  { category: "Transport", date: "2025-07-24", amount: -180, description: "Uber", notes: "" },
  { category: "Housing", date: "2025-07-23", amount: -7500, description: "Rent", notes: "Paid by bank" },
  { category: "Bills", date: "2025-07-22", amount: -400, description: "Phone Bill", notes: "Airtel" },
  { category: "Shopping", date: "2025-07-21", amount: -450, description: "Book", notes: "Amazon" },
];

function getYearMonth(date) {
  const d = new Date(date);
  return { year: d.getFullYear(), month: d.getMonth() };
}

function App() {
  const today = new Date();
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [editIdx, setEditIdx] = useState(-1);
  const [editNote, setEditNote] = useState('');
  // For filtering months
  const [activeYear, setActiveYear] = useState(today.getFullYear());
  const [activeMonth, setActiveMonth] = useState(today.getMonth());

  // Filtered for active month
  const monthTx = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getFullYear() === activeYear && d.getMonth() === activeMonth;
  });

  // Compute balances
  const totalBalance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const monthlyBalance = monthTx.reduce((sum, t) => sum + Number(t.amount), 0);

  // Chart Data
  const pieData = Object.values(
    monthTx.reduce((acc, curr) => {
      const key = curr.category || "Other";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += Math.abs(Number(curr.amount));
      return acc;
    }, {})
  );

  // For Line chart
  const chartData = monthTx
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(tx => ({
      date: tx.date,
      amount: tx.amount
    }));

  // Add transaction
  function handleSubmit(e) {
    e.preventDefault();
    const newTx = {
      category, date, amount: Number(amount), description, notes
    };
    setTransactions([newTx, ...transactions]);
    setModalOpen(false);
    setCategory('');
    setDate('');
    setAmount('');
    setDescription('');
    setNotes('');
  }

  // Edit note
  function handleEditNote(idx) {
    setEditIdx(idx);
    setEditNote(monthTx[idx].notes || "");
  }
  function handleSaveNote(idx) {
    // Find actual index in transactions
    const tx = monthTx[idx];
    const realIdx = transactions.findIndex(t =>
      t.category === tx.category &&
      t.date === tx.date &&
      t.amount === tx.amount &&
      t.description === tx.description
    );
    setTransactions(transactions.map((t, i) =>
      i === realIdx ? { ...t, notes: editNote } : t
    ));
    setEditIdx(-1); setEditNote('');
  }
  // Delete transaction
  function handleDelete(idx) {
    // Find actual index in transactions
    const tx = monthTx[idx];
    setTransactions(transactions.filter((t, i) =>
      !(t.category === tx.category &&
        t.date === tx.date &&
        t.amount === tx.amount &&
        t.description === tx.description)
    ));
  }

  return (
    <div className="min-h-screen bg-[#101626] text-[#dee3ec] flex flex-col font-sans">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold mb-1" style={{ color: '#ff9500' }}>Welcome to FinSight</h1>
        <p className="mb-6 text-lg text-[#8ba0be]">
          Track, visualize, and understand your spending at a glance.
        </p>
        {/* Month Selector */}
        <div className="flex flex-row items-center gap-4 mb-3">
          <button onClick={() => setActiveYear(activeYear - 1)} className="text-indigo-400 px-2 text-2xl hover:text-indigo-300">{'<'}</button>
          {MONTHS.map((m, idx) => (
            <button
              key={m}
              className={`px-3 py-1 mx-1 rounded-lg font-bold text-sm transition 
                ${idx === activeMonth ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-[#101626]' : 'text-indigo-200 hover:bg-[#232d4d]'}
              `}
              onClick={() => setActiveMonth(idx)}
            >{m.slice(0, 3)}</button>
          ))}
          <button onClick={() => setActiveYear(activeYear + 1)} className="text-indigo-400 px-2 text-2xl hover:text-indigo-300">{'>'}</button>
          <span className="ml-2 text-indigo-200 font-bold">{activeYear}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#222b48] to-[#20273a] px-8 py-4 rounded-xl shadow-lg text-2xl font-bold flex-1 border-l-4 border-orange-400">
            Total Balance:&nbsp;
            <span className={`ml-2 font-extrabold ${totalBalance < 0 ? 'text-red-400' : 'text-indigo-400'}`}>
              ₹{totalBalance}
            </span>
          </div>
          <button
            className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 shadow-md hover:scale-105 hover:shadow-lg transition"
            onClick={() => setModalOpen(true)}
          >
            + Add Transaction
          </button>
        </div>
        {/* Monthly balance */}
        <div className="bg-[#141a2a] mb-5 rounded-xl px-4 py-2 font-bold shadow" style={{ width: "fit-content" }}>
          <span className="text-indigo-200">Monthly Balance: </span>
          <span className={`ml-1 ${monthlyBalance < 0 ? 'text-red-400' : 'text-indigo-400'}`}>
            ₹{monthlyBalance}
          </span>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">
            Transactions for {MONTHS[activeMonth]} {activeYear}
          </h2>
          <table className="w-full table-auto text-left whitespace-nowrap">
            <thead>
              <tr className="text-indigo-300 text-lg">
                <th className="p-2 font-semibold">Category</th>
                <th className="p-2 font-semibold">Date</th>
                <th className="p-2 font-semibold">Amount</th>
                <th className="p-2 font-semibold">Description</th>
                <th className="p-2 font-semibold">Notes</th>
                <th className="p-2 font-semibold">Edit</th>
                <th className="p-2 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {monthTx.length === 0 && (
                <tr><td colSpan={7} className="text-center py-6 text-indigo-100">No transactions found.</td></tr>
              )}
              {monthTx.map((tx, idx) => (
                <tr key={idx} className="border-b border-[#242c44]">
                  <td className="p-2">{tx.category}</td>
                  <td className="p-2">{tx.date}</td>
                  <td className={`p-2 ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount >= 0 ? '+' : '-'} ₹{Math.abs(tx.amount)}
                  </td>
                  <td className="p-2">{tx.description}</td>
                  <td className="p-2">
                    {editIdx === idx ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={editNote}
                          onChange={e => setEditNote(e.target.value)}
                          className="p-1 rounded bg-[#232c44] border border-indigo-400 text-white"
                          style={{ minWidth: 80 }}
                        />
                        <button
                          className="text-blue-400 px-2 py-1 rounded hover:bg-blue-900"
                          onClick={() => handleSaveNote(idx)}
                        >Save</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{tx.notes || <span className="text-gray-400">—</span>}</span>
                        <button
                          className="text-orange-400 hover:text-orange-300"
                          onClick={() => handleEditNote(idx)}
                          title="Edit note"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-400 font-bold px-2 py-1 hover:bg-blue-900 rounded"
                      onClick={() => handleEditNote(idx)}
                    >Edit</button>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Transaction Modal */}
        {modalOpen && (
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
        )}

        {/* Spending Over Time Chart */}
        <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg border-b-4 border-orange-400">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="indigoBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#a5b4fc" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={4}
                fill="url(#indigoBlue)"
                dot={{ r: 7, stroke: "#2563eb", fill: "#fff" }}
                activeDot={{ r: 10, fill: "#ff9500" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie/Donut Chart */}
        <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg border-l-4 border-orange-400">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                label={({ name, value }) => `${name}: ₹${value}`}
                labelLine={false}
                isAnimationActive={true}
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
