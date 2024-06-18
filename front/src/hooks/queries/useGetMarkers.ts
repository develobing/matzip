import {getMarkers} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetMarkers(options?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...options,
  });
}

export default useGetMarkers;
