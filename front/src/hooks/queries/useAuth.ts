import {
  ResponseProfile,
  ResponseToken,
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';
import {Category, Profile} from '@/types';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
} from '@/utils';
import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

function useSignup(options: UseMutationCustomOptions = {}) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...options,
  });
}

function useLogin<T>(
  loginApi: MutationFunction<ResponseToken, T>,
  options: UseMutationCustomOptions = {},
) {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },

    ...options,
  });
}

function useEmailLogin(options: UseMutationCustomOptions = {}) {
  return useLogin(postLogin, options);
}

function useKakaoLogin(options: UseMutationCustomOptions = {}) {
  return useLogin(kakaoLogin, options);
}

function useAppleLogin(options: UseMutationCustomOptions = {}) {
  return useLogin(appleLogin, options);
}

function useGetRefreshToken() {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError, isPending};
}

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {RED, YELLOW, GREEN, BLUE, PURPLE};
  return {categories, ...rest};
};

function useGetProfile(
  options?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    select: transformProfileCategory,

    ...options,
  });
}

function useLogout(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },

    ...options,
  });
}

function useUpdateProfile(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...options,
  });
}

function useMutationDeleteAccount(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    ...options,
  });
}

function useMutateCategory(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...options,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({enabled: refreshTokenQuery.isSuccess});
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const deleteAccountMutation = useMutationDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();
  const isLoginLoading = refreshTokenQuery.isPending;

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    logoutMutation,
    getProfileQuery,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
    isLogin,
    isLoginLoading,
    getProfile,
  };
}

export default useAuth;
