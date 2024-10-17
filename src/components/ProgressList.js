import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ progressEntries, onDelete, onEdit }) => {
    return (
        <div>
            {progressEntries.length > 0 ? (
                progressEntries.map((entry, index) => (
                    <ProgressItem
                        key={entry._id} // Use entry ID as the key
                        entry={entry}
                        onDelete={() => onDelete(index)} // Delete handler
                        onEdit={() => onEdit(index)} // Edit handler
                    />
                ))
            ) : (
                <p>No progress entries found.</p> // Message if no entries exist
            )}
        </div>
    );
};

export default ProgressList;
