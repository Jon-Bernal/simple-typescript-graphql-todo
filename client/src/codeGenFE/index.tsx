import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Status {
  Complete = "COMPLETE",
  Incomplete = "INCOMPLETE",
}

export type Todo = {
  __typename?: "Todo";
  _id: Scalars["ID"];
  content: Scalars["String"];
  status: Status;
};

export type Query = {
  __typename?: "Query";
  todo: Todo;
  todos: Array<Maybe<Todo>>;
};

export type QueryTodoArgs = {
  _id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  makeTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Scalars["Boolean"];
  updateStatus: Todo;
};

export type MutationMakeTodoArgs = {
  content: Scalars["String"];
};

export type MutationUpdateTodoArgs = {
  _id: Scalars["ID"];
  content: Scalars["String"];
};

export type MutationDeleteTodoArgs = {
  _id: Scalars["ID"];
};

export type MutationUpdateStatusArgs = {
  _id: Scalars["ID"];
  status: Status;
};

export type Fetch_All_TodosQueryVariables = Exact<{ [key: string]: never }>;

export type Fetch_All_TodosQuery = { __typename?: "Query" } & {
  todos: Array<
    Maybe<{ __typename?: "Todo" } & Pick<Todo, "_id" | "status" | "content">>
  >;
};

export const Fetch_All_TodosDocument = gql`
  query FETCH_ALL_TODOS {
    todos {
      _id
      status
      content
    }
  }
`;

/**
 * __useFetch_All_TodosQuery__
 *
 * To run a query within a React component, call `useFetch_All_TodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetch_All_TodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetch_All_TodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetch_All_TodosQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Fetch_All_TodosQuery,
    Fetch_All_TodosQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    Fetch_All_TodosQuery,
    Fetch_All_TodosQueryVariables
  >(Fetch_All_TodosDocument, baseOptions);
}
export function useFetch_All_TodosLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Fetch_All_TodosQuery,
    Fetch_All_TodosQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    Fetch_All_TodosQuery,
    Fetch_All_TodosQueryVariables
  >(Fetch_All_TodosDocument, baseOptions);
}
export type Fetch_All_TodosQueryHookResult = ReturnType<
  typeof useFetch_All_TodosQuery
>;
export type Fetch_All_TodosLazyQueryHookResult = ReturnType<
  typeof useFetch_All_TodosLazyQuery
>;
export type Fetch_All_TodosQueryResult = Apollo.QueryResult<
  Fetch_All_TodosQuery,
  Fetch_All_TodosQueryVariables
>;
