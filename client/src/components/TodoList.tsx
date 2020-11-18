import React, { FC } from "react";
import SingleTodo from "./SingleTodo";
import { useFetch_All_TodosQuery } from "../codeGenFE";

const TodoList: FC = () => {
  const { data, loading, error } = useFetch_All_TodosQuery();

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
        if (t?.__typename === "Todo") {
          return <SingleTodo data={t} />;
        }
      })}
    </div>
  );
};

export default TodoList;
// <SingleTodo _id={t._id} status={t.status} content={t.content}/>
