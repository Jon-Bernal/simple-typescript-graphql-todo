import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Status {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE'
}

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  content: Scalars['String'];
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  todo: Todo;
  todos: Array<Maybe<Todo>>;
};


export type QueryTodoArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  makeTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Scalars['Boolean'];
  updateStatus: Todo;
};


export type MutationMakeTodoArgs = {
  content: Scalars['String'];
};


export type MutationUpdateTodoArgs = {
  _id: Scalars['ID'];
  content: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateStatusArgs = {
  _id: Scalars['ID'];
  status: Status;
};

export type TodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, '_id' | 'status' | 'content'>
);

export type Delete_TodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Delete_TodoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTodo'>
);

export type Make_TodoMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type Make_TodoMutation = (
  { __typename?: 'Mutation' }
  & { makeTodo: (
    { __typename?: 'Todo' }
    & TodoFragment
  ) }
);

export type Update_StatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: Status;
}>;


export type Update_StatusMutation = (
  { __typename?: 'Mutation' }
  & { updateStatus: (
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  ) }
);

export type Update_TodoMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type Update_TodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  ) }
);

export type Fetch_All_TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type Fetch_All_TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  )>> }
);

export const TodoFragmentDoc = gql`
    fragment todo on Todo {
  _id
  status
  content
}
    `;
export const Delete_TodoDocument = gql`
    mutation DELETE_TODO($id: ID!) {
  deleteTodo(_id: $id)
}
    `;
export type Delete_TodoMutationFn = Apollo.MutationFunction<Delete_TodoMutation, Delete_TodoMutationVariables>;

/**
 * __useDelete_TodoMutation__
 *
 * To run a mutation, you first call `useDelete_TodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_TodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDelete_TodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDelete_TodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Delete_TodoMutation, Delete_TodoMutationVariables>) {
        return ApolloReactHooks.useMutation<Delete_TodoMutation, Delete_TodoMutationVariables>(Delete_TodoDocument, baseOptions);
      }
export type Delete_TodoMutationHookResult = ReturnType<typeof useDelete_TodoMutation>;
export type Delete_TodoMutationResult = Apollo.MutationResult<Delete_TodoMutation>;
export type Delete_TodoMutationOptions = Apollo.BaseMutationOptions<Delete_TodoMutation, Delete_TodoMutationVariables>;
export const Make_TodoDocument = gql`
    mutation MAKE_TODO($content: String!) {
  makeTodo(content: $content) {
    ...todo
  }
}
    ${TodoFragmentDoc}`;
export type Make_TodoMutationFn = Apollo.MutationFunction<Make_TodoMutation, Make_TodoMutationVariables>;

/**
 * __useMake_TodoMutation__
 *
 * To run a mutation, you first call `useMake_TodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMake_TodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeTodoMutation, { data, loading, error }] = useMake_TodoMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useMake_TodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Make_TodoMutation, Make_TodoMutationVariables>) {
        return ApolloReactHooks.useMutation<Make_TodoMutation, Make_TodoMutationVariables>(Make_TodoDocument, baseOptions);
      }
export type Make_TodoMutationHookResult = ReturnType<typeof useMake_TodoMutation>;
export type Make_TodoMutationResult = Apollo.MutationResult<Make_TodoMutation>;
export type Make_TodoMutationOptions = Apollo.BaseMutationOptions<Make_TodoMutation, Make_TodoMutationVariables>;
export const Update_StatusDocument = gql`
    mutation UPDATE_STATUS($id: ID!, $status: Status!) {
  updateStatus(_id: $id, status: $status) {
    _id
    status
    content
  }
}
    `;
export type Update_StatusMutationFn = Apollo.MutationFunction<Update_StatusMutation, Update_StatusMutationVariables>;

/**
 * __useUpdate_StatusMutation__
 *
 * To run a mutation, you first call `useUpdate_StatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_StatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdate_StatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdate_StatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Update_StatusMutation, Update_StatusMutationVariables>) {
        return ApolloReactHooks.useMutation<Update_StatusMutation, Update_StatusMutationVariables>(Update_StatusDocument, baseOptions);
      }
export type Update_StatusMutationHookResult = ReturnType<typeof useUpdate_StatusMutation>;
export type Update_StatusMutationResult = Apollo.MutationResult<Update_StatusMutation>;
export type Update_StatusMutationOptions = Apollo.BaseMutationOptions<Update_StatusMutation, Update_StatusMutationVariables>;
export const Update_TodoDocument = gql`
    mutation UPDATE_TODO($id: ID!, $content: String!) {
  updateTodo(_id: $id, content: $content) {
    _id
    status
    content
  }
}
    `;
export type Update_TodoMutationFn = Apollo.MutationFunction<Update_TodoMutation, Update_TodoMutationVariables>;

/**
 * __useUpdate_TodoMutation__
 *
 * To run a mutation, you first call `useUpdate_TodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_TodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdate_TodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdate_TodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Update_TodoMutation, Update_TodoMutationVariables>) {
        return ApolloReactHooks.useMutation<Update_TodoMutation, Update_TodoMutationVariables>(Update_TodoDocument, baseOptions);
      }
export type Update_TodoMutationHookResult = ReturnType<typeof useUpdate_TodoMutation>;
export type Update_TodoMutationResult = Apollo.MutationResult<Update_TodoMutation>;
export type Update_TodoMutationOptions = Apollo.BaseMutationOptions<Update_TodoMutation, Update_TodoMutationVariables>;
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
export function useFetch_All_TodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Fetch_All_TodosQuery, Fetch_All_TodosQueryVariables>) {
        return ApolloReactHooks.useQuery<Fetch_All_TodosQuery, Fetch_All_TodosQueryVariables>(Fetch_All_TodosDocument, baseOptions);
      }
export function useFetch_All_TodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Fetch_All_TodosQuery, Fetch_All_TodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Fetch_All_TodosQuery, Fetch_All_TodosQueryVariables>(Fetch_All_TodosDocument, baseOptions);
        }
export type Fetch_All_TodosQueryHookResult = ReturnType<typeof useFetch_All_TodosQuery>;
export type Fetch_All_TodosLazyQueryHookResult = ReturnType<typeof useFetch_All_TodosLazyQuery>;
export type Fetch_All_TodosQueryResult = Apollo.QueryResult<Fetch_All_TodosQuery, Fetch_All_TodosQueryVariables>;