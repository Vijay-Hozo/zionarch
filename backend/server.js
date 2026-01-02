import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendQuoteEmail } from './routes/quote.js';
import { sendInternshipEmail } from './routes/internship.js';
import { sendWorkApplicationEmail } from './routes/work-application.js';
import { sendInternshipApplicationEmail } from './routes/internship-application.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Quote email endpoint
app.post('/api/quote', sendQuoteEmail);

// Internship application endpoint (old careers page)
app.post('/api/internship', sendInternshipEmail);

// Work application endpoint (new)
app.post('/api/work-application', sendWorkApplicationEmail);

// Internship application endpoint (new)
app.post('/api/internship-application', sendInternshipApplicationEmail);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    success: false 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
