import React, { FC, useState, ChangeEvent } from "react";
import { useMake_TodoMutation } from "../codeGenFE";

interface Props {
  // content: string;
}

const MakeTodo: FC<Props> = () => {
  // const { content } = props;
  const [todoText, setTodoText] = useState("");
  const [makeTodoMutation, { data, loading, error }] = useMake_TodoMutation({
    variables: {
      content: todoText, // value for 'content'
    },
  });

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    console.log("error", error);
    return <span>loading...</span>;
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
