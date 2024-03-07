import { GraphQLResolveInfo } from 'graphql';
import { ProductInterface } from './models/ProductModel';
import { ProducerInterface } from './models/ProducerModel';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateProductInput = {
  name: Scalars['String']['input'];
  producerId: Scalars['ID']['input'];
  vintage: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProducts?: Maybe<Array<Maybe<Product>>>;
  deleteProducts?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  syncProductsFromCSV?: Maybe<Scalars['Boolean']['output']>;
  updateProduct?: Maybe<Product>;
};


export type MutationCreateProductsArgs = {
  products: Array<CreateProductInput>;
};


export type MutationDeleteProductsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationUpdateProductArgs = {
  _id: Scalars['ID']['input'];
  product: UpdateProductInput;
};

export type Producer = {
  __typename?: 'Producer';
  _id: Scalars['ID']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  region?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  producer: Producer;
  producerId: Scalars['ID']['output'];
  vintage: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  productsByProducer?: Maybe<Array<Maybe<Product>>>;
};


export type QueryProductArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryProductsByProducerArgs = {
  producerId: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  producerId?: InputMaybe<Scalars['ID']['input']>;
  vintage?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateProductInput: CreateProductInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Producer: ResolverTypeWrapper<ProducerInterface>;
  Product: ResolverTypeWrapper<ProductInterface>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateProductInput: UpdateProductInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateProductInput: CreateProductInput;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Producer: ProducerInterface;
  Product: ProductInterface;
  Query: {};
  String: Scalars['String']['output'];
  UpdateProductInput: UpdateProductInput;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<MutationCreateProductsArgs, 'products'>>;
  deleteProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType, RequireFields<MutationDeleteProductsArgs, 'ids'>>;
  syncProductsFromCSV?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, '_id' | 'product'>>;
};

export type ProducerResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Producer'] = ResolversParentTypes['Producer']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['Producer'], ParentType, ContextType>;
  producerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vintage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, '_id'>>;
  productsByProducer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryProductsByProducerArgs, 'producerId'>>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Producer?: ProducerResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

