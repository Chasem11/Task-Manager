import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import './App.css';

function App() {
  const { authToken, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:3000/tasks', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [authToken]);

  const completeTask = (id) => {
    axios.put(`http://localhost:3000/tasks/${id}`, { completed: true }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(() => setTasks(tasks.map(task => 
        task._id === id ? { ...task, completed: true } : task
      )))
      .catch(error => console.error('Error completing task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const addTask = (name) => {
    axios.post('http://localhost:3000/tasks', { name, completed: false }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  if (!authToken) {
    return <Login />;
  }

  return (
    <div className="container">
      <Header />
      <button onClick={logout}>Logout</button>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
