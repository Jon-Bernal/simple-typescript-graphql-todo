import { applyExtensions } from "graphql-tools";
import React, {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { BiTrash, BiPencil } from "react-icons/bi";

import {
  Todo,
  // Status,
  useDeleteTodoMutation,
  // useUpdateStatusMutation,
  useUpdateTodoMutation,
} from "../codeGenFE/index";
import Checkbox from "./Checkbox";

interface Props {
  todo: Todo;
  // setTodoID: Dispatch<SetStateAction<string | null>>;
}

// const SingleTodo: FC<Props> = ({ todo, setTodoID }) => {
const SingleTodo: FC<Props> = ({ todo }) => {
  const { _id, status, content } = todo;

  const [updateMode, setUpdateMode] = useState(false);
  const [updateTodoContent, setUpdateTodoContent] = useState(content);

  const [deleteTodoMutation, { loading, error }] = useDeleteTodoMutation({
    variables: {
      id: _id,
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          todos() {
            if (data) {
              cache.evict({ id: _id });
              cache.gc();
            }
          },
        },
      });
    },
    onError(error) {
      // Run error dispatch or retry logic here
    },
  });

  function delTodo() {
    deleteTodoMutation();
  }

  const [
    updateTodoMutation,
    { error: updateTodoError },
  ] = useUpdateTodoMutation({
    variables: {
      id: _id,
      content: updateTodoContent,
    },
    update(cache, { data }) {
      setUpdateMode(false);
      console.log("data :>> ", data);
    },
    onError(error) {
      // dispatch error here
      console.log("error :>> ", error);
    },
  });

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    return <span>error</span>;
  }

  if (updateMode) {
    return (
      <div>
        <Checkbox status={status} id={_id} />{" "}
        <input
          type="text"
          value={updateTodoContent}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setUpdateTodoContent(e.target.value);
          }}
        />
        <button onClick={() => updateTodoMutation()}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        <Checkbox status={status} id={_id} />
        {content}
        <span onClick={delTodo}>
          <BiTrash />
        </span>
        <span onClick={() => setUpdateMode(true)}>
          <BiPencil />
        </span>
      </p>
    </div>
  );
};

export default SingleTodo;
