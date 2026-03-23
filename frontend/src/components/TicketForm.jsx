import { useState } from "react";
import { createTicket } from "../services/api";

export default function TicketForm({ refresh }) {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    priority: "Low",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(form);
    setForm({ subject: "", message: "", priority: "Low" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-3">Create Ticket</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}