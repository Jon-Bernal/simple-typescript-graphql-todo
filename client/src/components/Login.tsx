import React, { useState, FC, Dispatch } from "react";
import { Actions } from "../App";

import { useLoginMutation, UserLoginInput } from "../codeGenFE";

interface loginProps {
  dispatch: Dispatch<Actions>;
}

const Login: FC<loginProps> = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { data, loading, error }] = useLoginMutation({
    variables: {
      input: {
        username: username,
        password: password,
      }, // value for 'input'
    },
    update(cache, { data }) {
      console.log("data :>> ", data);
      if (data?.login?.__typename === "Token") {
        localStorage.setItem("todoToken", data?.login?.token);
        dispatch({ type: "login", userId: data.login.token });
      }
    },
    onError(error) {
      // Run error dispatch or retry logic here
    },
  });

  console.log("data :>> ", data);

  if (error) {
    console.log("error", error);
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={() => loginMutation()}>
        <input
          type="text"
          value={username}
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          name="username"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
