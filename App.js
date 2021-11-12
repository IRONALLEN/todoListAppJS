import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false,
    };

    setTodos([...todos, todoItem]);
    setNewTodo('');
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className='App'>
      <form
        onSubmit={(event) => {
          handleNewTodoSubmit(event);
        }}
      >
        <h1>Todos List</h1>
        <input
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          type='text'
          value={newTodo}
        />
        <div>
          <button>Add</button>{' '}
        </div>
      </form>
      {todos.map((todo, i) => {
        const todoClasses = ['bold', 'italics'];
        if (todo.complete) {
          todoClasses.push('line-through');
        }

        return (
          <div key={i}>
            <span className={todoClasses.join(' ')}>{todo.text}</span>
            <input
              onChange={(event) => {
                handleToggleComplete(i);
              }}
              checked={todo.complete}
              className='checkbox'
              type='checkbox'
            />
            <button
              className='del-btn'
              onClick={(event) => {
                handleTodoDelete(i);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
