import React, { FC } from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useMeQuery, useLogoutMutation } from "./codeGenFE";

const Header: FC = () => {
  const [logout, { client }] = useLogoutMutation();
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  let body: any = null;

  console.log("data", data);

  // if (loading) {
  //   body = null;
  // } else if (data && data.me) {
  //   body = <div>you are logged in as: {data.me.username}</div>;
  // } else {
  //   body = <div>not logged in</div>;
  // }
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/bye">Bye</Link>
      </div>
      <button
        onClick={async () => {
          await logout();
          setAccessToken("");
          await client!.resetStore();
        }}>
        Logout
      </button>
    </header>
  );
};

export default Header;
