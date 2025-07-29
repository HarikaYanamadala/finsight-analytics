// src/components/TransactionTable.js
import React from "react";
import { FaEdit } from "react-icons/fa";

export default function TransactionTable({
  monthTx,
  editIdx,
  editNote,
  handleEditNote,
  handleSaveNote,
  setEditNote,
  handleDelete
}) {
  return (
    <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-300">
        Transactions
      </h2>
      <table className="w-full table-auto text-left whitespace-nowrap">
        <thead>
          <tr className="text-indigo-300 text-lg">
            <th className="p-2 font-semibold">Category</th>
            <th className="p-2 font-semibold">Date</th>
            <th className="p-2 font-semibold">Amount</th>
            <th className="p-2 font-semibold">Description</th>
            <th className="p-2 font-semibold">Notes</th>
            {/*<th className="p-2 font-semibold">Edit</th>
            <th className="p-2 font-semibold">Delete</th>*/}
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
  );
}
