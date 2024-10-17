import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProgressForm from './components/ProgressForm';
import ProgressList from './components/ProgressList';
import ProgressCalendar from './components/ProgressCalendar';

const App = () => {
    const [progressEntries, setProgressEntries] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/progress');
            setProgressEntries(response.data);
        } catch (error) {
            console.error("Error fetching progress entries:", error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleAddOrUpdateEntry = async (entry) => {
        try {
            if (currentIndex >= 0) {
                await axios.put(`http://localhost:5000/api/progress/${progressEntries[currentIndex]._id}`, entry);
                fetchEntries();
                setCurrentIndex(-1);
            } else {
                await axios.post('http://localhost:5000/api/progress', entry);
                fetchEntries();
            }
        } catch (error) {
            console.error("Error adding or updating entry:", error);
        }
    };

    const handleDeleteEntry = async (index) => {
        try {
            await axios.delete(`http://localhost:5000/api/progress/${progressEntries[index]._id}`);
            fetchEntries(); // Refresh the entry list after deletion
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const handleEditEntry = (index) => {
        console.log("Editing entry at index:", index); // Log which entry is being edited
        setCurrentIndex(index); // Set the current index for editing
    };

    return (
        <div className="container">
            <h1>Daily Progress Tracker</h1>
            <div className="main-content">
                <div className="left-column">
                    <ProgressForm 
                        onSubmit={handleAddOrUpdateEntry} 
                        initialData={currentIndex >= 0 ? progressEntries[currentIndex] : null} 
                    />
                    <ProgressList 
                        progressEntries={progressEntries} 
                        onDelete={handleDeleteEntry} 
                        onEdit={handleEditEntry} 
                    />
                </div>
                <div className="right-column">
                    <ProgressCalendar progressEntries={progressEntries} />
                </div>
            </div>
        </div>
    );
};

export default App;
