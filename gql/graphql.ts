/* eslint-disable */
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

export type CreateSlideImageInput = {
  key: Scalars['ID']['input'];
  seq: Scalars['Int']['input'];
};

export type CreateSlideInput = {
  description: Scalars['String']['input'];
  images: Array<InputMaybe<CreateSlideImageInput>>;
  projectId: Scalars['Int']['input'];
  seq: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createSlide: Slide;
  deleteProject: Scalars['Boolean']['output'];
  deleteSlide: Scalars['Boolean']['output'];
  updateProject: Project;
  updateSlide: Slide;
};


export type MutationCreateProjectArgs = {
  project: CreateProjectInput;
};


export type MutationCreateSlideArgs = {
  slide: CreateSlideInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSlideArgs = {
  slideId: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  project: CreateProjectInput;
};


export type MutationUpdateSlideArgs = {
  slide: UpdateSlideInput;
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
  projectId: Scalars['ID']['input'];
  seq: Scalars['Int']['input'];
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
  images: Array<SlideImage>;
  seq: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
};

export type SlideImage = {
  __typename?: 'SlideImage';
  file: UploadFile;
  seq: Scalars['Int']['output'];
};

export type UpdateSlideInput = {
  description: Scalars['String']['input'];
  images: Array<InputMaybe<CreateSlideImageInput>>;
  projectId: Scalars['Int']['input'];
  seq: Scalars['Int']['input'];
  slideId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
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
