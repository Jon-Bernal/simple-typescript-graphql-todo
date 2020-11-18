import React, { FC } from "react";
import { Todo } from "../codeGenFE/index";

interface Props {
  data: Todo;
  // children: ()
}

const SingleTodo: FC<Props | undefined> = ({ data }) => {
  const { _id, status, content } = data;
  return (
    <div>
      <p>{_id}</p>
      <p>{status}</p>
      <p>{content}</p>
    </div>
  );
};

export default SingleTodo;
