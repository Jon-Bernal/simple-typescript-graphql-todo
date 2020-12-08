import React, { FC, useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import Routes from "./Routes";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const test = await fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
        const { accessToken } = await test.json();
        setAccessToken(accessToken);
        console.log("data.accessToken", accessToken);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
      }
    };
    refresh();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return <Routes />;
};

export default App;
