import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
    return (
        <li>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.name}
            </span>
            <button onClick={() => onComplete(task._id)}>Complete</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
   );
};

export default Task;