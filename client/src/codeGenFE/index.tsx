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
  todos: TodosRes;
  user: User;
  users: Array<Maybe<User>>;
  me: User;
};


export type QueryGetCommentsArgs = {
  userId: Scalars['String'];
};


export type QueryTodoArgs = {
  userId: Scalars['ID'];
  _id: Scalars['ID'];
};


export type QueryTodosArgs = {
  userId: Scalars['ID'];
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};


export type QueryMeArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  makeComment: Comment;
  updateComment: Comment;
  deleteComment: Scalars['Boolean'];
  makeTodo: TodoRes;
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

export type Subscription = {
  __typename?: 'Subscription';
  newComment: Comment;
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

export type TodoError = {
  __typename?: 'TodoError';
  source: Scalars['String'];
  message: Scalars['String'];
};

export type TodoRes = {
  __typename?: 'TodoRes';
  errors?: Maybe<Array<Maybe<TodoError>>>;
  todo?: Maybe<Todo>;
};

export type TodosRes = {
  __typename?: 'TodosRes';
  errors?: Maybe<Array<Maybe<TodoError>>>;
  todos?: Maybe<Array<Maybe<Todo>>>;
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

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, '_id' | 'userId' | 'comment'>
);

export type TodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, '_id' | 'userId' | 'status' | 'content'>
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MakeCommentMutationVariables = Exact<{
  userId: Scalars['String'];
  comment: Scalars['String'];
}>;


export type MakeCommentMutation = (
  { __typename?: 'Mutation' }
  & { makeComment: (
    { __typename?: 'Comment' }
    & CommentFragment
  ) }
);

export type MakeTodoMutationVariables = Exact<{
  input: MakeTodoInput;
}>;


export type MakeTodoMutation = (
  { __typename?: 'Mutation' }
  & { makeTodo: (
    { __typename?: 'TodoRes' }
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'TodoError' }
      & Pick<TodoError, 'source' | 'message'>
    )>>>, todo?: Maybe<(
      { __typename?: 'Todo' }
      & TodoFragment
    )> }
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

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment: (
    { __typename?: 'Comment' }
    & CommentFragment
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
    & TodoFragment
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
    & TodoFragment
  ) }
);

export type FetchAllTodosQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type FetchAllTodosQuery = (
  { __typename?: 'Query' }
  & { todos: (
    { __typename?: 'TodosRes' }
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'TodoError' }
      & Pick<TodoError, 'source' | 'message'>
    )>>>, todos?: Maybe<Array<Maybe<(
      { __typename?: 'Todo' }
      & TodoFragment
    )>>> }
  ) }
);

export type FetchTodoQueryVariables = Exact<{
  id: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type FetchTodoQuery = (
  { __typename?: 'Query' }
  & { todo: (
    { __typename?: 'Todo' }
    & TodoFragment
  ) }
);

export type GetAllCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCommentsQuery = (
  { __typename?: 'Query' }
  & { getAllComments: Array<Maybe<(
    { __typename?: 'Comment' }
    & CommentFragment
  )>> }
);

export type GetCommentsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: Array<Maybe<(
    { __typename?: 'Comment' }
    & CommentFragment
  )>> }
);

export type MeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  )>> }
);

export type NewCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCommentSubscription = (
  { __typename?: 'Subscription' }
  & { newComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'userId' | 'comment'>
  ) }
);

export const CommentFragmentDoc = gql`
    fragment comment on Comment {
  _id
  userId
  comment
}
    `;
export const TodoFragmentDoc = gql`
    fragment todo on Todo {
  _id
  userId
  status
  content
}
    `;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: ID!, $userId: ID!) {
  deleteComment(_id: $id, userId: $userId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MakeCommentDocument = gql`
    mutation MakeComment($userId: String!, $comment: String!) {
  makeComment(userId: $userId, comment: $comment) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;
export type MakeCommentMutationFn = Apollo.MutationFunction<MakeCommentMutation, MakeCommentMutationVariables>;

/**
 * __useMakeCommentMutation__
 *
 * To run a mutation, you first call `useMakeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeCommentMutation, { data, loading, error }] = useMakeCommentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useMakeCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakeCommentMutation, MakeCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<MakeCommentMutation, MakeCommentMutationVariables>(MakeCommentDocument, baseOptions);
      }
export type MakeCommentMutationHookResult = ReturnType<typeof useMakeCommentMutation>;
export type MakeCommentMutationResult = Apollo.MutationResult<MakeCommentMutation>;
export type MakeCommentMutationOptions = Apollo.BaseMutationOptions<MakeCommentMutation, MakeCommentMutationVariables>;
export const MakeTodoDocument = gql`
    mutation MakeTodo($input: MakeTodoInput!) {
  makeTodo(input: $input) {
    errors {
      source
      message
    }
    todo {
      ...todo
    }
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
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: ID!, $comment: String!) {
  updateComment(_id: $id, comment: $comment) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($id: ID!, $status: Status!) {
  updateStatus(_id: $id, status: $status) {
    ...todo
  }
}
    ${TodoFragmentDoc}`;
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
    ...todo
  }
}
    ${TodoFragmentDoc}`;
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
    query FetchAllTodos($userId: ID!) {
  todos(userId: $userId) {
    errors {
      source
      message
    }
    todos {
      ...todo
    }
  }
}
    ${TodoFragmentDoc}`;

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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFetchAllTodosQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FetchAllTodosQuery, FetchAllTodosQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchAllTodosQuery, FetchAllTodosQueryVariables>(FetchAllTodosDocument, baseOptions);
      }
export function useFetchAllTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchAllTodosQuery, FetchAllTodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchAllTodosQuery, FetchAllTodosQueryVariables>(FetchAllTodosDocument, baseOptions);
        }
export type FetchAllTodosQueryHookResult = ReturnType<typeof useFetchAllTodosQuery>;
export type FetchAllTodosLazyQueryHookResult = ReturnType<typeof useFetchAllTodosLazyQuery>;
export type FetchAllTodosQueryResult = Apollo.QueryResult<FetchAllTodosQuery, FetchAllTodosQueryVariables>;
export const FetchTodoDocument = gql`
    query FetchTodo($id: ID!, $userId: ID!) {
  todo(userId: $userId, _id: $id) {
    ...todo
  }
}
    ${TodoFragmentDoc}`;

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
 *      userId: // value for 'userId'
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
export const GetAllCommentsDocument = gql`
    query GetAllComments {
  getAllComments {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetAllCommentsQuery__
 *
 * To run a query within a React component, call `useGetAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCommentsQuery, GetAllCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllCommentsQuery, GetAllCommentsQueryVariables>(GetAllCommentsDocument, baseOptions);
      }
export function useGetAllCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCommentsQuery, GetAllCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllCommentsQuery, GetAllCommentsQueryVariables>(GetAllCommentsDocument, baseOptions);
        }
export type GetAllCommentsQueryHookResult = ReturnType<typeof useGetAllCommentsQuery>;
export type GetAllCommentsLazyQueryHookResult = ReturnType<typeof useGetAllCommentsLazyQuery>;
export type GetAllCommentsQueryResult = Apollo.QueryResult<GetAllCommentsQuery, GetAllCommentsQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($userId: String!) {
  getComments(userId: $userId) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
      }
export function useGetCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const MeDocument = gql`
    query Me($id: ID!) {
  me(_id: $id) {
    _id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(_id: $id) {
    _id
    username
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    _id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const NewCommentDocument = gql`
    subscription NewComment {
  newComment {
    _id
    userId
    comment
  }
}
    `;

/**
 * __useNewCommentSubscription__
 *
 * To run a query within a React component, call `useNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCommentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCommentSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewCommentSubscription, NewCommentSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewCommentSubscription, NewCommentSubscriptionVariables>(NewCommentDocument, baseOptions);
      }
export type NewCommentSubscriptionHookResult = ReturnType<typeof useNewCommentSubscription>;
export type NewCommentSubscriptionResult = Apollo.SubscriptionResult<NewCommentSubscription>;