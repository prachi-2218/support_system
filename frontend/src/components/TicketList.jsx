import { useState } from "react";
import { updateTicket } from "../services/api";

const statusConfig = {
  NEW: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "",
    label: "New"
  },
  INVESTIGATING: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "",
    label: "Investigating"
  },
  RESOLVED: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "",
    label: "Resolved"
  },
};

const priorityConfig = {
  Low: {
    color: "text-green-600 bg-green-50 border-green-200",
    icon: "",
    label: "Low"
  },
  Medium: {
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: "",
    label: "Medium"
  },
  High: {
    color: "text-red-600 bg-red-50 border-red-200",
    icon: "",
    label: "High"
  },
};

export default function TicketList({ tickets, refresh, loading }) {
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  const handleStatusChange = async (id, status) => {
    try {
      await updateTicket(id, status);
      refresh();
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  const toggleMessageExpansion = (ticketId) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(ticketId)) {
      newExpanded.delete(ticketId);
    } else {
      newExpanded.add(ticketId);
    }
    setExpandedMessages(newExpanded);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading tickets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <h2 className="text-xl font-semibold text-white flex items-center justify-between">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ticket List
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'}
          </span>
        </h2>
      </div>

      <div className="p-6">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-600">Create your first ticket to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Priority</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{ticket.subject}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <div className="text-sm text-gray-600">
                          {expandedMessages.has(ticket._id) ? (
                            <div className="whitespace-pre-wrap">{ticket.message}</div>
                          ) : (
                            <div className="truncate">{ticket.message}</div>
                          )}
                        </div>
                        {ticket.message.length > 50 && (
                          <button
                            onClick={() => toggleMessageExpansion(ticket._id)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 flex items-center transition-colors"
                          >
                            {expandedMessages.has(ticket._id) ? (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Show less
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Show more
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${priorityConfig[ticket.priority].color}`}>
                        {priorityConfig[ticket.priority].icon} {priorityConfig[ticket.priority].label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[ticket.status].color}`}>
                        {statusConfig[ticket.status].icon} {statusConfig[ticket.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(ticket.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="relative inline-block">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="NEW"> New</option>
                          <option value="INVESTIGATING"> Investigating</option>
                          <option value="RESOLVED"> Resolved</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}