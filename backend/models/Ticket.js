const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["NEW", "INVESTIGATING", "RESOLVED"],
    default: "NEW",
  }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);