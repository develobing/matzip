import {deletePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      // 삭제된 장소/Feed 갱신
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDER_POSTS],
      });

      // 1. 조회 API 재호출 하는 방법
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });

      // // 2. 기존 Data에 새로 등록된 항목을 추가하는 방법
      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   existingMarkers => {
      //     return existingMarkers?.filter(marker => marker.id !== deleteId);
      //   },
      // );
    },

    ...options,
  });
}

export default useMutateDeletePost;
