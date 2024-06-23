import {ImageUri, Post} from '@/types/domain';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
type ResponsePost = Post & {images: ImageUri[]};

const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  console.log('updatePost', id, body);
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

type ResponseCalendarPosts = Record<number, CalendarPost[]>;

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPosts> => {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);

  return data;
};

export {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getCalendarPosts,
};
export type {
  RequestCreatePost,
  ResponsePost,
  ResponseSinglePost,
  RequestUpdatePost,
  CalendarPost,
  ResponseCalendarPosts,
};
