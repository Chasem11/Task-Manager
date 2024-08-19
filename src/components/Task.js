import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <li className="task-item">
      <div className={`task-name-complete ${task.completed ? 'completed' : ''}`}>
        <span>{task.name}</span>
      </div>
      <div className="task-buttons">
        <button
          className={task.completed ? 'completed' : ''}
          onClick={() => onComplete(task.id)}
        >
          Complete
        </button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default Task;


