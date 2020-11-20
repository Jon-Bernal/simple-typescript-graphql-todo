import React, { useState } from "react";
import TodoList from "./components/TodoList";
import MakeTodo from "./components/MakeTodo";
import ContrivedComponent from "./components/ContrivedComponent";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [todoID, setTodoID] = useState<string | null>(null);

  return (
    <div className="App">
      <MakeTodo />
      <TodoList setTodoID={setTodoID} />
      {todoID ? <ContrivedComponent todoID={todoID} /> : null}
    </div>
  );
}

export default App;
