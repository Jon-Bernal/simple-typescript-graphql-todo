import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useFetch_All_TodosQuery } from "./codeGenFE";

function App() {
  const { data, loading, error } = useFetch_All_TodosQuery();

  console.log("data :>> ", data);
  console.log("loading :>> ", loading);
  console.log("error :>> ", error);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data?.todos.map((t) => {
          return (
            <p key={t?._id}>
              {t?.status} - {t?.content}
            </p>
          );
        })}
      </header>
    </div>
  );
}

export default App;
