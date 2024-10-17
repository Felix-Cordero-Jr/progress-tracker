import React from 'react';

// Function to format the date for display
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProgressItem = ({ entry, onDelete, onEdit }) => {
    return (
        <div className="progress-item">
            <h4>{formatDate(entry.date)} - By {entry.developer}</h4> {/* Format date without the unwanted portion */}
            <p>{entry.details}</p>
            <p>Status: {entry.status}</p>
            <p>Task Link: <a href={entry.taskLink} target="_blank" rel="noopener noreferrer">{entry.taskLink}</a></p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ProgressItem;
