import React, { FC, Dispatch, SetStateAction } from "react";
import SingleTodo from "./SingleTodo";
import { useFetchAllTodosQuery, Todo } from "../codeGenFE";

interface Props {
  // setTodoID: Dispatch<SetStateAction<string | null>>;
  userId: string;
}

// const TodoList: FC<Props> = ({ setTodoID, userId }) => {
const TodoList: FC<Props> = ({ userId }) => {
  const { data, loading, error } = useFetchAllTodosQuery({
    variables: {
      userId: userId,
    },
  });

  if (loading) {
    console.log("loading", loading);
    return <div>...loading</div>;
  }
  if (error) {
    console.log({ error });
    return <div>ERROR</div>;
  }

  return (
    <div>
      {data?.todos?.todos?.map((t) => {
        // if (t?.__typename === "Todo") {
        // return <SingleTodo todo={t!} key={t!._id} setTodoID={setTodoID} />;
        return <SingleTodo todo={t!} key={t!._id} />;
        // }
      })}
    </div>
  );
};

export default TodoList;
