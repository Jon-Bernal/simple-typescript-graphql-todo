import React, { FC } from "react";
import { useUsersQuery } from "../codeGenFE";

const Home: FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>Users:</div>
      <ul>
        {data.users.map((x) => {
          return (
            <li key={x?._id}>
              {x?.username}, {x?._id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
