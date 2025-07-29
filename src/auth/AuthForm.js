import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-20 bg-[#141a2a] p-8 rounded-xl shadow">
      <h2 className="mb-4 text-2xl font-bold text-indigo-300">Sign in</h2>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="mb-3 w-full p-2 rounded"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        className="mb-3 w-full p-2 rounded"
        placeholder="Password"
        required
      />
      <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded">Sign in</button>
    </form>
  );
}
