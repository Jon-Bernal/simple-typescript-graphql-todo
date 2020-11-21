import React, { useState, useReducer } from "react";
import TodoList from "./components/TodoList";
import MakeTodo from "./components/MakeTodo";
import ContrivedComponent from "./components/ContrivedComponent";
import Login from "./components/Login";
import Register from "./components/Register";
// import logo from "./logo.svg";
import "./App.css";

interface State {
  userId: null | string;
  todoId: null | string;
}

interface Actions {
  type: string;
}

const appReducer = (state: State, action: Actions) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initState = {
  userId: null,
  todoId: null,
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initState);
  const { userId } = state;
  const [todoID, setTodoID] = useState<string | null>(null);

  if (!userId) {
    return (
      <div>
        {/* <Register /> */}
        {/* <Login /> */}
      </div>
    );
  }

  return (
    <div className="App">
      {/* <Register /> */}
      {/* <Login /> */}

      <MakeTodo />
      <TodoList setTodoID={setTodoID} />
      {todoID ? <ContrivedComponent todoID={todoID} /> : null}
    </div>
  );
}

export default App;
