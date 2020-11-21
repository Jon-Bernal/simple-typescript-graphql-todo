import React, { useState } from "react";

import { useLoginMutation, UserLoginInput } from "../codeGenFE";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { data, loading, error }] = useLoginMutation({
    variables: {
      input: {
        username: username,
        password: password,
      }, // value for 'input'
    },
  });

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
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          name="username"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Login;
