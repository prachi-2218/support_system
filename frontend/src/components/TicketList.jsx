import { updateTicket } from "../services/api";

const statusColors = {
  NEW: "bg-yellow-200",
  INVESTIGATING: "bg-blue-200",
  RESOLVED: "bg-green-200",
};

const priorityColors = {
  Low: "text-green-600",
  Medium: "text-yellow-600",
  High: "text-red-600",
};

export default function TicketList({ tickets, refresh }) {

  const handleStatusChange = async (id, status) => {
    await updateTicket(id, status);
    refresh();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl mb-3">Tickets</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t._id} className="text-center border-t">
              <td>{t.subject}</td>

              <td className={priorityColors[t.priority]}>
                {t.priority}
              </td>

              <td className={statusColors[t.status]}>
                {t.status}
              </td>

              <td>{new Date(t.createdAt).toLocaleString()}</td>

              <td>
                <select
                  value={t.status}
                  onChange={(e) =>
                    handleStatusChange(t._id, e.target.value)
                  }
                >
                  <option>NEW</option>
                  <option>INVESTIGATING</option>
                  <option>RESOLVED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}