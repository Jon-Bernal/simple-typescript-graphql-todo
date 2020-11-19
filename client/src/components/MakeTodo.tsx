import React, { FC, useState, ChangeEvent } from "react";
import { useMakeTodoMutation } from "../codeGenFE";
import { ApolloConsumer } from "@apollo/client";

console.log("Cache :>> ", Cache);

interface Props {
  // content: string;
}

// interface State {
//
// }
//
// interface Actions {
//
// }

const MakeTodo: FC<Props> = () => {
  // const { content } = props;
  const [todoText, setTodoText] = useState("");
  const [makeTodoMutation, { data, loading, error }] = useMakeTodoMutation(
    {
      variables: {
        content: todoText, // value for 'content'
      },
    }
    // , {update(cache, {data: {makeTodoMutation}})}
  );

  // function AddTodo() {
  //   let input;
  //   const [addTodo] = useMutation(ADD_TODO, {
  //     update(cache, { data: { addTodo } }) {
  //       cache.modify({
  //         fields: {
  //           todos(existingTodos = []) {
  //             const newTodoRef = cache.writeFragment({
  //               data: addTodo,
  //               fragment: gql`
  //                 fragment NewTodo on Todo {
  //                   id
  //                   type
  //                 }
  //               `
  //             });
  //             return [...existingTodos, newTodoRef];
  //           }
  //         }
  //       });
  //     }
  //   });

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
