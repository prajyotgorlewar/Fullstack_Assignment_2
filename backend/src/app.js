import './database/connection.js';
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';
import path from 'path';
import { unlink } from 'fs';
import express from 'express';
import cors from 'cors'; // Import the cors middleware

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cors middleware
app.use(cors());

app.use('/api/users', usersRoutes);

// Defining a route for handling form submission
app.post('/submit-form', async (req, res) => {
  try {
    // Extract form data from request body
    const { email, password } = req.body;

    // Here, you would perform your registration logic using the email and password data.
    // For now, let's just log the received data.
    console.log('Received form data:', { email, password });

    // Send a response to the client
    res.status(200).json({ message: 'Form data received successfully' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

const port = 3000;
app.listen(port);
console.log('Server listening at port:', port);

