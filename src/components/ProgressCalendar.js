import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import '../App.css'; // Ensure you are importing your custom styles
import ProgressList from './ProgressList';

const ProgressCalendar = ({ progressEntries }) => {
    const [date, setDate] = useState(new Date());

    // Update current time every second
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Filter entries for the selected date
    const filteredEntries = progressEntries.filter(entry => 
        new Date(entry.date).toDateString() === date.toDateString()
    );

    return (
        <div>
            <div>
                <h3>The Time is: {currentTime}</h3> {/* Display current time */}
            </div>
            <Calendar 
                onChange={setDate} 
                value={date} 
                className="react-calendar" // Add your custom class for styling
            />
            <h2>Progress on {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}:</h2>
            <div>
                {filteredEntries.length > 0 ? (
                    filteredEntries.map(entry => (
                        <div key={entry._id}>
                            <h4>By {entry.developer}</h4>
                            <p>{entry.details}</p>
                            <p>Status: {entry.status}</p>
                            <p>Time Spent: {entry.timeSpent}</p>
                            <p>Task Link: <a href={entry.taskLink} target="_blank" rel="noopener noreferrer">{entry.taskLink}</a></p>
                        </div>
                    ))
                ) : (
                    <p>No progress entries found for this date.</p>
                )}
            </div>
        </div>
    );
};

export default ProgressCalendar;
