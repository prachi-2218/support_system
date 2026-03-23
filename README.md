# Support System

A ticket management system with React frontend and Node.js backend.

## Architecture

### Frontend (React + Vite)
- **App.jsx**: Entry point that renders SupportDashboard component
- **SupportDashboard.jsx**: Main dashboard component with ticket list and modal functionality
- **TicketForm.jsx**: Reusable form component (works as both standalone and modal)
- **TicketList.jsx**: Table view with expandable messages and status updates
- **api.js**: API service layer for backend communication

### Backend (Node.js + Express + MongoDB)
- **server.js**: Express server with MongoDB connection
- **routes/ticketRoutes.js**: RESTful API endpoints for tickets
- **controllers/ticketController.js**: Business logic for ticket operations
- **models/Ticket.js**: Mongoose schema for ticket data

## Features

- Create new tickets via modal
- View all tickets in responsive table
- Update ticket status (New → Investigating → Resolved)
- Priority levels (Low, Medium, High)
- Expandable message view
- Real-time updates
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Configure `.env` using `env.example` file

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

## API Endpoints

- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket status

## Data Model

```javascript
{
  subject: String,
  message: String,
  priority: String, // Low, Medium, High
  status: String, // NEW, INVESTIGATING, RESOLVED
  createdAt: Date,
  updatedAt: Date
}
```

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose

