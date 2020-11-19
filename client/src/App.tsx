import React from "react";
import TodoList from "./components/TodoList";
import MakeTodo from "./components/MakeTodo";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MakeTodo />
      <TodoList />
    </div>
  );
}

export default App;
