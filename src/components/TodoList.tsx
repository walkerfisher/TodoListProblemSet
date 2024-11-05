import { useState, useEffect } from "react";
import { Todo } from "../App";

type Props = {
  tasks: Todo[];
};

const TodoList: React.FC<Props> = ({ tasks }) => {
  const [todoList, setTodoList] = useState<Todo[]>(tasks);
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  function handleCreate() {
    if (newTask === "") {
      setError(true);
      return;
    }

    const formattedTask: Todo = {
      id: todoList.length + 1,
      title: newTask,
      userId: 1,
      completed: false,
    };

    const updatedTodoList = [...todoList, formattedTask];

    setTodoList(updatedTodoList);
    setNewTask("");
    setError(false);
  }

  function handleDelete(todo: Todo) {
    let counter = 1;
    const updatedTodoList = todoList.filter(
      (item: Todo) => item.id !== todo.id
    );
    updatedTodoList.forEach((todo: Todo) => {
      todo.id = counter;
      counter++;
    });
    setTodoList(updatedTodoList);
  }

  function handleChange(value: string) {
    setError(false);
    setNewTask(value);
  }

  return (
    <div id="main-container">
      <div id="todo-input-container">
        <label id="todo-input-label">Task: </label>
        <input
          id="todo-input"
          type="text"
          placeholder="Create new task..."
          value={newTask}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <button id="todo-create-button" onClick={handleCreate}>
          Add
        </button>
      </div>
      {error && (
        <div id="error-message" className="errorMessage">
          Please create task description.
        </div>
      )}
      <ul className="taskList">
        {todoList.map((todo) => {
          return (
            <div key={todo.id} className="taskItem">
              <li id={todo.id.toString()}>{todo.title} </li>
              <button
                id="delete-todo"
                className="deleteButton"
                onClick={() => {
                  handleDelete(todo);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
