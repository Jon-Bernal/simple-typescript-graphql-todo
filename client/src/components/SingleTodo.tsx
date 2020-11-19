import React, { FC } from "react";

import { Todo, Status } from "../codeGenFE/index";
import Checkbox from "./Checkbox";

interface Props {
  data: Todo;
}

const SingleTodo: FC<Props> = ({ data }) => {
  const { _id, status, content } = data;
  return (
    <div>
      <p>
        <Checkbox status={status} id={_id} /> {content}
      </p>
    </div>
  );
};

export default SingleTodo;
