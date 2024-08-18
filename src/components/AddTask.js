import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!taskName) {
            alert('Please enter a task name');
            return;
        }

        onAdd(taskName);
        setTaskName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='New Task Name'
                value={taskName} 
                onChange={event => setTaskName(event.target.value)} 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;