import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../codeGenFE";

const Register: FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submit");
        const response = await register({
          variables: {
            input: {
              username,
              password,
              confirmPassword: confirmPW,
            },
          },
        });
        console.log("response", response);
        history.push("/");
      }}>
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
      <div>
        <input
          type="password"
          value={confirmPW}
          placeholder="confirm password"
          onChange={(e) => setConfirmPW(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
