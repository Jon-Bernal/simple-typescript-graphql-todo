import React, { FC } from "react";
import { useByeQuery } from "../codeGenFE";

const Bye: FC = () => {
  const { data, loading, error } = useByeQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error {error}</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{data.bye}</div>;
};

export default Bye;
