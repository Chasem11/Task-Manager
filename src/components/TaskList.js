import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task._id}>
            <td>{task.name}</td>
            <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
            <td>
              <Button
                variant="success"
                className="mx-3"
                onClick={() => onComplete(task._id)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  pointerEvents: task.completed ? 'none' : 'auto',
                  opacity: task.completed ? 0.5 : 1
                }}
              >
                Complete
              </Button>{' '}
              <Button variant="danger" onClick={() => onDelete(task._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;

