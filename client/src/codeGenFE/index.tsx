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

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  userId: Scalars['ID'];
  comment: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Maybe<Comment>>;
  getAllComments: Array<Maybe<Comment>>;
  todo: Todo;
  todos: Array<Maybe<Todo>>;
  user: User;
  users: Array<Maybe<User>>;
  me: User;
  getUserData: UserData;
};


export type QueryGetCommentsArgs = {
  userId: Scalars['String'];
};


export type QueryTodoArgs = {
  _id: Scalars['ID'];
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};


export type QueryMeArgs = {
  _id: Scalars['ID'];
};


export type QueryGetUserDataArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  makeComment: Comment;
  updateComment: Comment;
  deleteComment?: Maybe<Scalars['Boolean']>;
  makeTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Scalars['Boolean'];
  updateStatus: Todo;
  register: RegisterResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
};


export type MutationMakeCommentArgs = {
  userId: Scalars['String'];
  comment: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  _id: Scalars['ID'];
  comment: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  _id: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationMakeTodoArgs = {
  input: MakeTodoInput;
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


export type MutationRegisterArgs = {
  input: UserRegisterInput;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};

export enum Status {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE'
}

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  userId: Scalars['ID'];
  content: Scalars['String'];
  status: Status;
};

export type MakeTodoInput = {
  userId: Scalars['String'];
  content: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserData = {
  __typename?: 'UserData';
  user?: Maybe<User>;
  todos?: Maybe<Array<Maybe<Todo>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export type UserDataError = {
  __typename?: 'UserDataError';
  message?: Maybe<Scalars['String']>;
};

export type UserLoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginError = {
  __typename?: 'LoginError';
  message: Scalars['String'];
};

export type LoginResponse = Token | LoginError;

export type UserRegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type RegisterError = {
  __typename?: 'RegisterError';
  message: Scalars['String'];
};

export type RegisterResponse = Token | RegisterError;

export type TodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, '_id' | 'status' | 'content'>
);

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTodo'>
);

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename: 'Token' }
    & Pick<Token, 'token'>
  ) | (
    { __typename: 'LoginError' }
    & Pick<LoginError, 'message'>
  ) }
);

export type MakeTodoMutationVariables = Exact<{
  input: MakeTodoInput;
}>;


export type MakeTodoMutation = (
  { __typename?: 'Mutation' }
  & { makeTodo: (
    { __typename?: 'Todo' }
    & TodoFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename: 'Token' }
    & Pick<Token, 'token'>
  ) | (
    { __typename: 'RegisterError' }
    & Pick<RegisterError, 'message'>
  ) }
);

export type UpdateStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: Status;
}>;


export type UpdateStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateStatus: (
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  ) }
);

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  ) }
);

export type FetchAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllTodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  )>> }
);

export type FetchTodoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchTodoQuery = (
  { __typename?: 'Query' }
  & { todo: (
    { __typename?: 'Todo' }
    & Pick<Todo, '_id' | 'status' | 'content'>
  ) }
);

export const TodoFragmentDoc = gql`
    fragment todo on Todo {
  _id
  status
  content
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(_id: $id)
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, baseOptions);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    __typename
    ... on Token {
      token
    }
    ... on LoginError {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MakeTodoDocument = gql`
    mutation MakeTodo($input: MakeTodoInput!) {
  makeTodo(input: $input) {
    ...todo
  }
}
    ${TodoFragmentDoc}`;
export type MakeTodoMutationFn = Apollo.MutationFunction<MakeTodoMutation, MakeTodoMutationVariables>;

/**
 * __useMakeTodoMutation__
 *
 * To run a mutation, you first call `useMakeTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeTodoMutation, { data, loading, error }] = useMakeTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMakeTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakeTodoMutation, MakeTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<MakeTodoMutation, MakeTodoMutationVariables>(MakeTodoDocument, baseOptions);
      }
export type MakeTodoMutationHookResult = ReturnType<typeof useMakeTodoMutation>;
export type MakeTodoMutationResult = Apollo.MutationResult<MakeTodoMutation>;
export type MakeTodoMutationOptions = Apollo.BaseMutationOptions<MakeTodoMutation, MakeTodoMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UserRegisterInput!) {
  register(input: $input) {
    __typename
    ... on Token {
      token
    }
    ... on RegisterError {
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($id: ID!, $status: Status!) {
  updateStatus(_id: $id, status: $status) {
    _id
    status
    content
  }
}
    `;
export type UpdateStatusMutationFn = Apollo.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, baseOptions);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: ID!, $content: String!) {
  updateTodo(_id: $id, content: $content) {
    _id
    status
    content
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const FetchAllTodosDocument = gql`
    query FetchAllTodos {
  todos {
    _id
    status
    content
  }
}
    `;

/**
 * __useFetchAllTodosQuery__
 *
 * To run a query within a React component, call `useFetchAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllTodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchAllTodosQuery, FetchAllTodosQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchAllTodosQuery, FetchAllTodosQueryVariables>(FetchAllTodosDocument, baseOptions);
      }
export function useFetchAllTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchAllTodosQuery, FetchAllTodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchAllTodosQuery, FetchAllTodosQueryVariables>(FetchAllTodosDocument, baseOptions);
        }
export type FetchAllTodosQueryHookResult = ReturnType<typeof useFetchAllTodosQuery>;
export type FetchAllTodosLazyQueryHookResult = ReturnType<typeof useFetchAllTodosLazyQuery>;
export type FetchAllTodosQueryResult = Apollo.QueryResult<FetchAllTodosQuery, FetchAllTodosQueryVariables>;
export const FetchTodoDocument = gql`
    query FetchTodo($id: ID!) {
  todo(_id: $id) {
    _id
    status
    content
  }
}
    `;

/**
 * __useFetchTodoQuery__
 *
 * To run a query within a React component, call `useFetchTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTodoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchTodoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FetchTodoQuery, FetchTodoQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchTodoQuery, FetchTodoQueryVariables>(FetchTodoDocument, baseOptions);
      }
export function useFetchTodoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchTodoQuery, FetchTodoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchTodoQuery, FetchTodoQueryVariables>(FetchTodoDocument, baseOptions);
        }
export type FetchTodoQueryHookResult = ReturnType<typeof useFetchTodoQuery>;
export type FetchTodoLazyQueryHookResult = ReturnType<typeof useFetchTodoLazyQuery>;
export type FetchTodoQueryResult = Apollo.QueryResult<FetchTodoQuery, FetchTodoQueryVariables>;