import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import "./styles.css";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export default function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        setError("Server side error occured retreiving Todos.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      const filteredList = data.slice(0, 5);

      setTodoList(filteredList);
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {todoList && todoList.length > 0 && !error && (
        <TodoList tasks={todoList} />
      )}
    </div>
  );
}
