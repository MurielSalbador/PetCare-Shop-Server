import { useState } from 'react';
import { TODO_FILTERS } from '../../../../PetCare-Shop-Cliente/src/consts.js';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filterSelected, setFilterSelected] = useState(TODO_FILTERS.ALL);

  const handleRemove = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  const handleCompleted = (id, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const handleFilterChange = (filter) => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
  };

  const handleAddTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
       title,
      completed: false
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdateTitle = ({ id, title }) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return {
    todos: filteredTodos,
    activeCount,
    completedCount,
    filterSelected,
    handleRemove,
    handleCompleted,
    handleFilterChange,
    handleRemoveAllCompleted,
    handleAddTodo,
    handleUpdateTitle
  };
};
