import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useLoginMutation } from "../codeGenFE";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submit for login");
        const response = await login({
          variables: {
            input: {
              username,
              password,
            },
          },
        });
        console.log("response", response);
        history.push("/");
      }}
    >
      <div>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
