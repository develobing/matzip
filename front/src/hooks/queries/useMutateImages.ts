import {uploadImages} from '@/api';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateImages(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...options,
  });
}

export default useMutateImages;
