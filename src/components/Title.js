import React, { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';

const Title = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.splice(index, 1)[0];
    setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  const handleCompletedCheckboxChange = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    const todo = updatedCompletedTodos.splice(index, 1)[0];
    setCompletedTodos(updatedCompletedTodos);
    setTodos([...todos, todo]);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleDeleteCompletedTodo = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
  };

  const handleEditTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="py-3 d-flex justify-content-center">
        <div className="py-3 d-flex justify-content-center w-50 p-3 border border-secondary-subtle rounded shadow p-3 mb-5 bg-body-tertiary rounded">
          <input
            className="form-control form-control-lg w-80 p-2"
            type="text"
            placeholder="Enter Title"
            aria-label=".form-control-lg example"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="btn btn-primary mx-3 w-25"
            onClick={handleAddTodo}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="py-3 d-flex justify-content-center">
        <div className="w-50 px-2">
          <h3>Pending Todos</h3>
          {todos.map((todo, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="form-check-input p-2"
                type="checkbox"
                id={`todoCheckbox${index}`}
                onChange={() => handleCheckboxChange(index)}
                defaultChecked
              />
              <label
                className="form-check-label px-2"
                htmlFor={`todoCheckbox${index}`}
              >
                {todo}
              </label>
              <BsTrash
                className="ms-2 todo-icon" id="delete"
                onClick={() => handleDeleteTodo(index)}
              />
              <BsPencil
                className="ms-2 todo-icon" id="edit"
                onClick={() => {
                  const updatedTodo = prompt('Update the todo:', todo);
                  if (updatedTodo !== null) {
                    handleEditTodo(index, updatedTodo);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="py-3 d-flex justify-content-center">
        <div className="w-50 px-2">
          <h3>Completed Todos</h3>
          {completedTodos.map((completedTodo, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="form-check-input p-2"
                type="checkbox"
                id={`completedTodoCheckbox${index}`}
                onChange={() => handleCompletedCheckboxChange(index)}
                defaultChecked
              />
              <label
                className="form-check-label px-2"
                htmlFor={`completedTodoCheckbox${index}`}
              >
                {completedTodo}
              </label>
              <BsTrash
                className="ms-2 completed-todo-icon"
                onClick={() => handleDeleteCompletedTodo(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Title;
