import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import './App.css';

function App() {
  const { authToken, login, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5432/tasks', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [authToken]);

  const completeTask = (id) => {
    console.log(`Completing task with ID: ${id}`);
    axios.put(`http://localhost:5432/tasks/${id}`, { completed: true }, {
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
    axios.delete(`http://localhost:5432/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const addTask = (name) => {
    axios.post('http://localhost:5432/tasks', { name, completed: false }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  if (!authToken) {
    return showSignup ? (
      <Signup login={login} setShowSignup={setShowSignup} />
    ) : (
      <Login login={login} setShowSignup={setShowSignup} />
    );
  }

  return (
    <div className="taskContainer">
      <Header />
      <button className="task-button" onClick={logout}>Logout</button>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
