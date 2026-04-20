import { useState } from "react";
import Button from "../ui/Button";

export default function WalletModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    amount: "",
    type: "credit",
    reason: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="font-semibold mb-4">Adjust Wallet</h2>

        <input
          placeholder="Amount"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <input
          placeholder="Reason"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(form)} className="bg-blue-500 text-white">
            Submit
          </Button>
        </div>

      </div>
    </div>
  );
}