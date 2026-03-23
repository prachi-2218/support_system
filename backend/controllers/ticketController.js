const Ticket = require("../models/Ticket");

// Create ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status
exports.updateTicket = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};