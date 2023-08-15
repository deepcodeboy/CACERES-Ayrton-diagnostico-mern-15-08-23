import React from 'react';
import useTodoList from './useToDoList';
import './TodoList.css';

const TodoList = () => {
  const {
    tasks,
    newTask,
    newDescription,
    setNewTask,
    setNewDescription,
    createTask,
    completeTask,
    deleteTask,
  } = useTodoList();

  return (
    <div className="todo-container">
      <h1>Lista de Tareas</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={createTask}>Agregar Tarea</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className='div-description'>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className='div-buttons'>
              {!task.isComplete ? (
                <button onClick={() => completeTask(task._id)}>Completar</button>
              ) : (
                <span>Completada</span>
              )}
              <button onClick={() => deleteTask(task._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
