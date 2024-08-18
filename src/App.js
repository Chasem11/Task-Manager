import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import axios from 'axios';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const completeTask = (id) => {
    axios.put(`http://localhost:3000/tasks/${id}`, { completed: true })
        .then(() => setTasks(tasks.map(task => 
          task._id === id ? { ...task, completed: true } : task
      )))
      .catch(error => console.error('Error completing task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
        .then(() => setTasks(tasks.filter(task => task._id !== id)))
        .catch(error => console.error('Error deleting task:', error));
  };

  const addTask = (name) => {
    axios.post('http://localhost:3000/tasks', { name, completed: false })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="App">
      <Header />
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
