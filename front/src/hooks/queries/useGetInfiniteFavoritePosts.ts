import {ResponsePost, getFavoritePosts, getPosts} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfiniteFavoritePosts(
  options?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.FAVORITE, queryKeys.FAVORITE_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...options,
  });
}

export default useGetInfiniteFavoritePosts;
