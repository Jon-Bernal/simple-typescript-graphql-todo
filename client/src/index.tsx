import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Routes from "./Routes";
import { getAccessToken } from "./accessToken";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

const authLink = setContext(({ headers }: any) => {
  const accessToken = getAccessToken();
  console.log("accessToken", accessToken);
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
  // headers: {
  // authorization: localStorage.getItem("jwtToken") || "",
  // },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
