import React, { useState, useReducer, useEffect } from "react";
import TodoList from "./components/TodoList";
import MakeTodo from "./components/MakeTodo";
import ContrivedComponent from "./components/ContrivedComponent";
import Login from "./components/Login";
import Register from "./components/Register";
import Comments from "./components/Comments";
// import logo from "./logo.svg";
import "./App.css";

interface State {
  userId: null | string;
  todoId: null | string;
}

export type Actions = { type: "login"; userId: string } | { type: "logout" };

const appReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        userId: action.userId,
      };
    case "logout":
      localStorage.removeItem("todoToken");
      return {
        ...state,
        userId: null,
      };
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
  const { userId, todoId } = state;

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) {
      dispatch({ type: "login", userId: token });
    }
  }, []);

  if (!userId) {
    return (
      <div>
        <Register />
        <Login dispatch={dispatch} />z
      </div>
    );
  }

  return (
    <div className="App">
      <MakeTodo userId={userId} />
      {/* <TodoList setTodoID={setTodoID} /> */}
      <TodoList userId={userId} />
      {/* {todoID ? <ContrivedComponent todoID={todoID} /> : null} */}
      <Comments userId={userId} />
      <button
        onClick={() => {
          dispatch({ type: "logout" });
        }}
      >
        logout
      </button>
    </div>
  );
}

export default App;
