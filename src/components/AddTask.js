import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Enter a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button className="task-button" type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
