import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddTask = ({ onAdd }) => {
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please add a task name');
      return;
    }
    onAdd(name);
    setName('');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add Task
      </Button>
    </Form>
  );
};

export default AddTask;

