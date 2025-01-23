import { TTodos } from "../../types/todo";
import { CheckmarkCircleOutline, TrashOutline } from "react-ionicons";
import { TFilter } from "../";
import { SetState } from "../../types";

interface RenderTodosProps {
  todos: TTodos[];
  setTodos: SetState<TTodos[]>;
  filter: TFilter;
}

const RenderTodos = ({ todos, setTodos, filter }: RenderTodosProps) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    // return todo; //all filter
    return true;
  });

  //ToDoni o'chirish
  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //yangi kod
  const handleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="w-full flex-1 mt-3 overflow-y-auto py-2 pr-2">
      {filteredTodos.map((todo: TTodos) => {
        return (
          <div
            key={todo.id}
            className={`max-w-full overflow-hidden bg-[#12329] rounded-md h-12 px-3 mb-3 text-white flex items-center justify-between ${todo.completed && "opacity-[65%]"}`}
          >
            <span
              className={`flex-1 truncate ${todo.completed && "line-through"}`}
            >
              {todo.title}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => handleDelete(todo.id)}>
                <TrashOutline
                  color={"#F87171"}
                  width={"24px"}
                  height={"24px"}
                />
              </button>
              <button onClick={() => handleComplete(todo.id)}>
                <CheckmarkCircleOutline
                  color={"#F6c90e"}
                  width={"24px"}
                  height={"24px"}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderTodos;
