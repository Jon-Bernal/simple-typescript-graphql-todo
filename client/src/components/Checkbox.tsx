import React, { FC } from "react";
import { Status, useUpdateStatusMutation, Todo } from "../codeGenFE/index";

interface Props {
  status: Status;
  id: string;
}

const styles = {
  complete: {
    height: "20px",
    width: "20px",
    color: "white",
    background: "tomato",
    border: "none",
    boxShadow: "2px 2px 2px #323232",
    marginRight: "10px",
  },
  incomplete: {
    height: "20px",
    width: "20px",
    border: "none",
    boxShadow: "2px 2px 2px #323232",
    marginRight: "10px",
  },
};

const Checkbox: FC<Props> = ({ status, id }) => {
  const [
    updateStatusMutation,
    { data, loading, error },
  ] = useUpdateStatusMutation({
    variables: {
      id: id, // value for 'id'
      // status: status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE", // value for 'status'
      status: status === "INCOMPLETE" ? Status.Complete : Status.Incomplete, // value for 'status'
    },
  });

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    return <span> X( error )X </span>;
  }

  if (status === "INCOMPLETE") {
    return (
      <button
        onClick={() => updateStatusMutation()}
        style={styles.incomplete}
      ></button>
    );
  } else {
    return (
      <button
        onClick={() => updateStatusMutation()}
        style={styles.complete}
      ></button>
    );
  }
  // return <div>hi</div>;
};

export default Checkbox;
