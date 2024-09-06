import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import TaskList from './components/TaskList';
import AddTaskPage from './components/AddTaskPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <Router>
      <div className="app">
        <NavigationBar logout={logout} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-4">
                <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
              </div>
            }
          />
          <Route
            path="/add-task"
            element={<AddTaskPage addTask={addTask} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

