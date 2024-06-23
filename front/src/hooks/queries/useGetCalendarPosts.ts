import {ResponseCalendarPosts, getCalendarPosts} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  options?: UseQueryCustomOptions<ResponseCalendarPosts>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDER_POSTS, year, month],
    placeholderData: keepPreviousData,
    ...options,
  });
}

export default useGetCalendarPosts;
