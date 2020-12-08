import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../codeGenFE";
import { setAccessToken } from "../accessToken";

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
          // update: (store, { data }) => {
          //   if (!data) {
          //     return null;
          //   }
          //   store.writeQuery<MeQuery>({
          //     query: MeDocument,
          //     // TODO: fix this it's wrong
          //     data: {
          //       me: {
          //         _id: data.login.user.?._id,
          //         username: data.login.user?.username
          //       }
          //     }
          //   });
          // },
        });
        console.log("response", response);
        if (response && response.data) {
          setAccessToken(response.data.login.token!);
        }
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
