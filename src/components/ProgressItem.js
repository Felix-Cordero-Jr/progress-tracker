import React from 'react';

// Function to format date to a readable format
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProgressItem = ({ entry, onDelete, onEdit }) => {
    return (
        <div className="progress-item">
            <h4>{formatDate(entry.date)} - By {entry.developer}</h4> {/* Display date in words */}
            <p>{entry.details}</p>
            <p>Status: {entry.status}</p>
            <p>Time Spent: {entry.timeSpent}</p> {/* Displays the time spent */}
            <p>Task Link: <a href={entry.taskLink} target="_blank" rel="noopener noreferrer">{entry.taskLink}</a></p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ProgressItem;
