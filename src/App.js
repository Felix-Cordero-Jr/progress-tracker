import React, { useState, useEffect } from 'react';
import ProgressForm from './components/ProgressForm'; // Ensure the correct path
import ProgressCalendar from './components/ProgressCalendar'; // Ensure the correct path
import './App.css'; // CSS styles

const App = () => {
    const [progressEntries, setProgressEntries] = useState([]);

    const fetchEntries = async () => {
        const response = await fetch('http://localhost:5000/api/progress');
        const data = await response.json();
        setProgressEntries(data);
    };

    const handleSave = async (formData) => {
        const response = await fetch('http://localhost:5000/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const newEntry = await response.json();
        setProgressEntries([...progressEntries, newEntry]); // Update the state with the new entry
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="App">
            <h1 style={{ textAlign: 'center' }}>Daily Progress Tracker</h1>
            <div className="main-content">
                <div className="left-column">
                    <ProgressForm onSave={handleSave} />
                </div>
                <div className="right-column">
                    <ProgressCalendar progressEntries={progressEntries} />
                </div>
            </div>
        </div>
    );
};

export default App;
