import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  deleteComment?: Maybe<Scalars['Boolean']>;
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

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Subscription: ResolverTypeWrapper<{}>;
  Status: Status;
  Todo: ResolverTypeWrapper<Todo>;
  TodoError: ResolverTypeWrapper<TodoError>;
  TodoRes: ResolverTypeWrapper<TodoRes>;
  TodosRes: ResolverTypeWrapper<TodosRes>;
  MakeTodoInput: MakeTodoInput;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
  UserLoginInput: UserLoginInput;
  LoginError: ResolverTypeWrapper<LoginError>;
  LoginResponse: ResolversTypes['Token'] | ResolversTypes['LoginError'];
  UserRegisterInput: UserRegisterInput;
  RegisterError: ResolverTypeWrapper<RegisterError>;
  RegisterResponse: ResolversTypes['Token'] | ResolversTypes['RegisterError'];
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Comment: Comment;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Subscription: {};
  Todo: Todo;
  TodoError: TodoError;
  TodoRes: TodoRes;
  TodosRes: TodosRes;
  MakeTodoInput: MakeTodoInput;
  Token: Token;
  User: User;
  UserLoginInput: UserLoginInput;
  LoginError: LoginError;
  LoginResponse: ResolversParentTypes['Token'] | ResolversParentTypes['LoginError'];
  UserRegisterInput: UserRegisterInput;
  RegisterError: RegisterError;
  RegisterResponse: ResolversParentTypes['Token'] | ResolversParentTypes['RegisterError'];
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType, RequireFields<QueryGetCommentsArgs, 'userId'>>;
  getAllComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<QueryTodoArgs, 'userId' | '_id'>>;
  todos?: Resolver<ResolversTypes['TodosRes'], ParentType, ContextType, RequireFields<QueryTodosArgs, 'userId'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryMeArgs, '_id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  makeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationMakeCommentArgs, 'userId' | 'comment'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, '_id' | 'comment'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, '_id' | 'userId'>>;
  makeTodo?: Resolver<ResolversTypes['TodoRes'], ParentType, ContextType, RequireFields<MutationMakeTodoArgs, 'input'>>;
  updateTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, '_id' | 'content'>>;
  deleteTodo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, '_id'>>;
  updateStatus?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationUpdateStatusArgs, '_id' | 'status'>>;
  register?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newComment?: SubscriptionResolver<ResolversTypes['Comment'], "newComment", ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoError'] = ResolversParentTypes['TodoError']> = {
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoRes'] = ResolversParentTypes['TodoRes']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['TodoError']>>>, ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodosResResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodosRes'] = ResolversParentTypes['TodosRes']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['TodoError']>>>, ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  __resolveType: TypeResolveFn<'Token' | 'LoginError', ParentType, ContextType>;
};

export type RegisterErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterError'] = ResolversParentTypes['RegisterError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  __resolveType: TypeResolveFn<'Token' | 'RegisterError', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoError?: TodoErrorResolvers<ContextType>;
  TodoRes?: TodoResResolvers<ContextType>;
  TodosRes?: TodosResResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  LoginError?: LoginErrorResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  RegisterError?: RegisterErrorResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';