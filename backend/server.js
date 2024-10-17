const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // Ensure this matches your front-end requests

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/progress-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose schema
const progressSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    details: { type: String, required: true },
    status: { type: String, required: true },
    taskLink: { type: String, required: true }
});

const ProgressEntry = mongoose.model('ProgressEntry', progressSchema);

// Routes
app.get('/api/progress', async (req, res) => {
    try {
        const entries = await ProgressEntry.find();
        res.json(entries);
    } catch (err) {
        console.error('Error fetching progress entries:', err);
        res.status(500).send('Server error');
    }
});

app.post('/api/progress', async (req, res) => {
    const { date, details, status, taskLink } = req.body;
    try {
        const newEntry = new ProgressEntry({ date, details, status, taskLink });
        await newEntry.save(); // Save the entry to MongoDB
        res.status(201).json(newEntry); // Respond with the newly created entry
    } catch (err) {
        console.error('Error saving progress entry:', err); // Log errors for debugging
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
