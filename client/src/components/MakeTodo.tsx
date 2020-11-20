import React, { FC, useState, ChangeEvent } from "react";
import { TodoFragmentDoc, useMakeTodoMutation } from "../codeGenFE";

const MakeTodo: FC = () => {
  const [todoText, setTodoText] = useState("");
  const [makeTodoMutation, { loading, error }] = useMakeTodoMutation({
    variables: {
      content: todoText, // value for 'content'
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: data?.makeTodo,
              fragment: TodoFragmentDoc,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
    onError(error) {
      // Run error dispatch or retry logic here
    },
  });

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    console.log("error", error);
    return <span>error...</span>;
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setTodoText(ev.target.value);
  };

  const addTodo = (content: string) => {
    if (content === "") {
      return null;
    } else {
      makeTodoMutation();
    }
  };

  return (
    <div>
      <label htmlFor="input">Add New Todo: </label>
      <input
        type="text"
        value={todoText}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => handleChange(ev)}
      />
      <button onClick={() => addTodo(todoText)}>Add</button>
    </div>
  );
};

export default MakeTodo;
