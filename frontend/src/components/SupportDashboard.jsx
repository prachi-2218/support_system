import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import { getTickets } from "../services/api";

export default function SupportDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      setTickets(res.data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Support Dashboard</h1>
                <p className="text-gray-600">Manage and track customer support tickets</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Ticket
              </button>
            </div>
          </div>
        </header>

        <main>
          <TicketList tickets={tickets} refresh={fetchTickets} loading={loading} />
        </main>

        {showModal && (
          <div className="fixed inset-0  bg-opacity-10 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-black-400 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <TicketForm 
                refresh={fetchTickets} 
                onClose={() => setShowModal(false)}
                isModal={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
