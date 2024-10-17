import React, { useState, useEffect } from 'react';

const ProgressForm = ({ onSubmit, initialData }) => {
    const [entry, setEntry] = useState(initialData || { 
        date: '', 
        details: '', 
        status: 'New Task', 
        developer: '', 
        timeSpent: '0 hours', 
        taskLink: '',
    });

    useEffect(() => {
        if (initialData) {
            setEntry(initialData); // Populate form with initial data when editing
        } else {
            setEntry({ 
                date: '', 
                details: '', 
                status: 'New Task', 
                developer: '', 
                timeSpent: '0 hours', 
                taskLink: '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry({ ...entry, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the date before saving
        entry.date = new Date(entry.date).toISOString(); // Save in ISO format

        onSubmit(entry); // Call the onSubmit function with the current entry
        
        // Reset the form for the next entry
        setEntry({ 
            date: '', 
            details: '', 
            status: 'New Task', 
            developer: '', 
            timeSpent: '0 hours', 
            taskLink: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="date"
                value={entry.date}
                onChange={handleChange}
                required
            />
            <textarea
                name="details"
                value={entry.details}
                onChange={handleChange}
                placeholder="What did you learn today?"
                required
            />
            <select name="status" value={entry.status} onChange={handleChange}>
                <option value="New Task">New Task</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <input
                type="text"
                name="developer"
                value={entry.developer}
                onChange={handleChange}
                placeholder="Developer's Name"
                required
            />
            <input
                type="url"
                name="taskLink"
                value={entry.taskLink}
                onChange={handleChange}
                placeholder="Link to Task (URL)"
            />
            <button type="submit">Save Progress</button>
        </form>
    );
};

export default ProgressForm;
