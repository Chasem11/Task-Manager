import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <Task key={task._id} task={task} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
