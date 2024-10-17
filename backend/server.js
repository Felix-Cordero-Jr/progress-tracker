const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/progress-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.error("MongoDB connection error:", err));

// Define the schema
const progressEntrySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    details: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['New Task', 'In Progress', 'Done'], 
        default: 'New Task' 
    },
    developer: { type: String, required: true },
    timeSpent: { type: String },
    taskLink: { type: String },
    startTime: { type: Date },
    endTime: { type: Date }
});

// Create the model
const ProgressEntry = mongoose.model('ProgressEntry', progressEntrySchema);

// Routes

// Get all progress entries
app.get('/api/progress', async (req, res) => {
    try {
        const entries = await ProgressEntry.find();
        res.json(entries); // Return the entries as a JSON response
    } catch (error) {
        console.error("Error fetching progress entries:", error);
        res.status(500).json({ message: 'Error fetching progress entries' });
    }
});

// Create a new progress entry
app.post('/api/progress', async (req, res) => {
    try {
        const newEntry = new ProgressEntry(req.body);
        await newEntry.save();
        console.log('New Entry Saved:', newEntry); // Log the new entry
        res.status(201).json(newEntry); // Return the created entry
    } catch (error) {
        console.error("Error saving progress entry:", error);
        res.status(500).json({ message: 'Error saving progress entry' });
    }
});

// Update a progress entry
app.put('/api/progress/:id', async (req, res) => {
    try {
        const updatedEntry = await ProgressEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry); // Return the updated entry
    } catch (error) {
        console.error("Error updating progress entry:", error);
        res.status(500).json({ message: 'Error updating progress entry' });
    }
});

// Delete a progress entry
app.delete('/api/progress/:id', async (req, res) => {
    try {
        await ProgressEntry.findByIdAndDelete(req.params.id);
        res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting progress entry:", error);
        res.status(500).json({ message: 'Error deleting progress entry' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
