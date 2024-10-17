import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Keep this for calendar styles

const ProgressCalendar = ({ progressEntries }) => {
    return (
        <div className="progress-calendar" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
            <h2>The Time is: {new Date().toLocaleTimeString()}</h2>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Calendar</h3>
            <Calendar 
                tileClassName={({ date, view }) => {
                    // Highlight the current date
                    if (date.getDate() === new Date().getDate() && view === 'month') {
                        return 'highlight-today'; // Class for highlighting today
                    }
                }}
            />
            <h3 style={{ marginTop: '20px' }}>Progress on October 2024:</h3>
            {progressEntries.length > 0 ? (
                progressEntries.map(entry => (
                    <div key={entry._id} className="progress-entry">
                        <p>{new Date(entry.date).toLocaleDateString()} - {entry.details}</p>
                        <p>Status: {entry.status}</p>
                        <p>Task Link: <a href={entry.taskLink} target="_blank" rel="noopener noreferrer">{entry.taskLink}</a></p>
                    </div>
                ))
            ) : (
                <p>No progress entries found for this date.</p>
            )}
        </div>
    );
};

export default ProgressCalendar;
