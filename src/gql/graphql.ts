/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** LocalDateTime custom scalar type */
  LocalDateTime: { input: any; output: any; }
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  updateProject: Project;
};


export type MutationCreateProjectArgs = {
  project: CreateProjectInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  project: CreateProjectInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['LocalDateTime']['output'];
  creator: User;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  slides: Array<Slide>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  project: Project;
  projects: Array<Project>;
  slide: Slide;
  uploadFile: UploadFile;
  uploadFiles: Array<UploadFile>;
  user: User;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySlideArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUploadFileArgs = {
  key: Scalars['String']['input'];
};


export type QueryUploadFilesArgs = {
  keys: Array<Scalars['String']['input']>;
};

export type Slide = {
  __typename?: 'Slide';
  createdAt: Scalars['LocalDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<UploadFile>;
  seq: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
};

export type UploadFile = {
  __typename?: 'UploadFile';
  bucket: Scalars['String']['output'];
  createdAt: Scalars['LocalDateTime']['output'];
  key: Scalars['ID']['output'];
  originalName: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  uploader: User;
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  account: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, description: string, thumbnail?: string | null }> };

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, description: string, creator: { __typename?: 'User', id: string }, slides: Array<{ __typename?: 'Slide', id: string, seq: number, title: string, description: string }> } };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
  input: CreateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, description: string } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string } };


export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;