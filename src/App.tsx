import { useState } from "react";
import { TTodos } from "./types/todo";
import Layout from "./layout";
import { InputBar, RenderTodos, TFilter } from "./components";

function App() {
  const [todos, setTodos] = useState<TTodos[]>([]);
  const [filter, setFilter] = useState<TFilter>("all");

  return (
    <Layout>
      <InputBar setFilter={setFilter} todos={todos} setTodos={setTodos} />
      <RenderTodos todos={todos} setTodos={setTodos} filter={filter} />
    </Layout>
  );
}

export default App;
