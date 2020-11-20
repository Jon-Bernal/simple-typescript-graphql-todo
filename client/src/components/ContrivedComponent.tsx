import React, { FC } from "react";

import { useFetchTodoQuery } from "../codeGenFE";

interface Props {
  todoID: string;
}

const ContrivedComponent: FC<Props> = ({ todoID }) => {
  const { data, loading, error } = useFetchTodoQuery({
    variables: {
      id: todoID,
    },
  });

  // const todo = {data};

  console.log("data :>> ", data?.todo.content);

  return (
    <div>
      <p>_id: {data?.todo._id}</p>
      <p>status: {data?.todo.status}</p>
      <p>content: {data?.todo.content}</p>
    </div>
  );
};

export default ContrivedComponent;
