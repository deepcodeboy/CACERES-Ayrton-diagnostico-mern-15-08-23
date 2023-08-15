import { useState, useEffect } from 'react';
import axios from 'axios';

const useTodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const urlBase = "http://localhost:3000";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${urlBase}/task`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(`${urlBase}/task`, {
        title: newTask,
        description: newDescription,
      });

      setNewTask('');
      setNewDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.put(`${urlBase}/task/${taskId}/completar`);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${urlBase}/task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    newTask,
    newDescription,
    setNewTask,
    setNewDescription,
    createTask,
    completeTask,
    deleteTask,
  };
};

export default useTodoList;
