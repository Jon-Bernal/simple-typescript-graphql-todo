import React, { ChangeEvent, FC, useState } from "react";
import { TodoFragmentDoc, useMakeTodoMutation } from "../codeGenFE";

interface Props {
  userId: string;
}

const MakeTodo: FC<Props> = ({ userId }) => {
  const [todoText, setTodoText] = useState("");
  const [makeTodoMutation, { loading, error }] = useMakeTodoMutation({
    variables: {
      input: {
        content: todoText, // value for 'content'
        userId: userId,
      },
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            console.log("existingTodos :>> ", existingTodos);
            const newTodoRef = cache.writeFragment({
              data: data?.makeTodo?.todo,
              fragment: TodoFragmentDoc,
            });
            return [...existingTodos?.todos, newTodoRef];
          },
        },
      });
      setTodoText("");
    },
    onError(error) {
      console.log("error :>> ", error);
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
