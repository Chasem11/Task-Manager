import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <li className="task-item">
      <div className={`task-name-complete ${task.completed ? 'completed' : ''}`}>
        <span>{task.name}</span>
      </div>
      <div className="task-buttons">
        <button
          className={`task-button ${task.completed ? 'task-button-completed' : ''}`}
          onClick={() => onComplete(task._id)}
        >
          Complete
        </button>
        <button className='task-button' onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default Task;


