import { useEffect, useState } from "react";
import { TTodos } from "../../types/todo";
import { FilterBtn, TFilter } from "../";
import { SetState } from "../../types";
import "./style.css";

interface InputBarProps {
  todos: TTodos[];
  setTodos: SetState<TTodos[]>;
  setFilter: SetState<TFilter>;
}

const InputBar = ({ todos, setTodos, setFilter }: InputBarProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);

  const addTodo = (title: string) => {
    if (title.trim()) {
      const newTodo = { id: Math.random(), title, completed: false };
      setTodos([...todos, newTodo]);
      setTitle("");
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && title) {
        addTodo(title);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    //eslint-disable-next-line
  }, [title, todos]);

  return (
    <div className="container w-full flex items-center gap-3">
      <input
        type="text"
        className="input w-full bg-[#1e2329] outline-none h-12 rounded-md px-2 text-[#e9e9e9] font-medium"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="containerButton flex items-center gap-3">
        <FilterBtn setFilter={setFilter} />
        <button
          type="button"
          className="button bg-[#1e2329] py-3 px-7 hover:bg-[#F6C90E] rounded-md text-[1e2329]"
          onClick={() => addTodo(title)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default InputBar;
