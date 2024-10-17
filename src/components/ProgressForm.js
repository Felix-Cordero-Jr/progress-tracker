import React, { useState } from 'react';

const ProgressForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        date: '',
        details: '',
        status: 'New Task',
        taskLink: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Call the onSave function passed from the parent
        setFormData({ date: '', details: '', status: 'New Task', taskLink: '' }); // Reset form
    };

    return (
        <div className="progress-form" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Details:</label>
                    <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} required placeholder="Enter details about your progress..." />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <option value="New Task">New Task</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Link to Task (URL):</label>
                    <input type="url" value={formData.taskLink} onChange={(e) => setFormData({ ...formData, taskLink: e.target.value })} placeholder="https://example.com" />
                </div>

                <button type="submit">Save Progress</button>
            </form>
        </div>
    );
};

export default ProgressForm;
