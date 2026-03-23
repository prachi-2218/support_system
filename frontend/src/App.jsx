import { useEffect, useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import { getTickets } from "./services/api";

function App() {
   const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await getTickets();
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
     <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-4">Support Dashboard</h1>

      <TicketForm refresh={fetchTickets} />
      <TicketList tickets={tickets} refresh={fetchTickets} />
    </div>
    </>
  )
}

export default App
