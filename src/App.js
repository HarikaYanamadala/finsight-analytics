import { useAuth } from './auth/AuthContext';
import AuthForm from './auth/AuthForm';

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MonthSelector from "./components/MonthSelector";
import BalanceCard from "./components/BalanceCard";
import TransactionTable from "./components/TransactionTable";
import AddTransactionModal from "./components/AddTransactionModal";
import SpendingCharts from "./components/SpendingCharts";
import "./index.css";

// Utility
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

function App() {
  const { user } = useAuth();
  if (!user) {
    return <AuthForm />;
  }
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
  const [activeYear, setActiveYear] = useState(today.getFullYear());
  const [activeMonth, setActiveMonth] = useState(today.getMonth());

  // Filter transactions by selected month
  const monthTx = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getFullYear() === activeYear && d.getMonth() === activeMonth;
  });

  // Balances
  const totalBalance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const monthlyBalance = monthTx.reduce((sum, t) => sum + Number(t.amount), 0);

  // Handlers
  function handleAddTransaction(e) {
    e.preventDefault();
    const newTx = { category, date, amount: Number(amount), description, notes };
    setTransactions([newTx, ...transactions]);
    setModalOpen(false);
    setCategory('');
    setDate('');
    setAmount('');
    setDescription('');
    setNotes('');
  }

  function handleEditNote(idx) {
    setEditIdx(idx);
    setEditNote(monthTx[idx].notes || "");
  }
  function handleSaveNote(idx) {
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
  function handleDelete(idx) {
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
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold mb-1" style={{ color: '#ff9500' }}>Welcome to FinSight</h1>
        <p className="mb-6 text-lg text-[#8ba0be]">
          Track, visualize, and understand your spending at a glance.
        </p>

        <MonthSelector
          activeMonth={activeMonth}
          setActiveMonth={setActiveMonth}
          activeYear={activeYear}
          setActiveYear={setActiveYear}
        />

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <BalanceCard totalBalance={totalBalance} />
          <button
            className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 shadow-md hover:scale-105 hover:shadow-lg transition"
            onClick={() => setModalOpen(true)}
          >
            + Add Transaction
          </button>
        </div>

        <div className="bg-[#141a2a] mb-5 rounded-xl px-4 py-2 font-bold shadow" style={{ width: "fit-content" }}>
          <span className="text-indigo-200">Monthly Balance: </span>
          <span className={`ml-1 ${monthlyBalance < 0 ? 'text-red-400' : 'text-indigo-400'}`}>₹{monthlyBalance}</span>
        </div>

        <TransactionTable
          monthTx={monthTx}
          editIdx={editIdx}
          editNote={editNote}
          handleEditNote={handleEditNote}
          handleSaveNote={handleSaveNote}
          setEditNote={setEditNote}
          handleDelete={handleDelete}
        />

        {modalOpen &&
          <AddTransactionModal
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
            notes={notes}
            setNotes={setNotes}
            handleSubmit={handleAddTransaction}
            setModalOpen={setModalOpen}
          />
        }

        <SpendingCharts transactions={monthTx} />
      </main>
    </div>
  );
}

export default App;
