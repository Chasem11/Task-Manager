import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddTask from '../components/AddTask';

const AddTaskPage = ({ addTask }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mt-4">Add a New Task</h2>
          <AddTask onAdd={addTask} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddTaskPage;
