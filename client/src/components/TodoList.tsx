import React, { FC, Dispatch, SetStateAction } from "react";
import SingleTodo from "./SingleTodo";
import { useFetchAllTodosQuery, Todo } from "../codeGenFE";

interface Props {
  setTodoID: Dispatch<SetStateAction<string | null>>;
}

const TodoList: FC<Props> = ({ setTodoID }) => {
  const { data, loading, error } = useFetchAllTodosQuery();

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
      {data?.todos?.map((t) => {
        // if (t?.__typename === "Todo") {
        return <SingleTodo todo={t!} key={t!._id} setTodoID={setTodoID} />;
        // }
      })}
    </div>
  );
};

export default TodoList;
