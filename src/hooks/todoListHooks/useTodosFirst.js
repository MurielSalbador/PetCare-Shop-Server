import { useEffect, useState } from 'react';

export const useTodosFirst = () => {
  const [value, setValue] = useState(() => {
    const todos = window.localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
