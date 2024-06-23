import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {
  ResponseToken,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {
  removeEncryptStorage,
  setEncryptStorage,
  removeHeader,
  setHeader,
} from '@/utils';

function useSignup(options: UseMutationCustomOptions = {}) {
  return useMutation({
    mutationFn: postSignup,

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

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
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

  return {isSuccess, isError};
}

function useGetProfile(options?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,

    ...options,
  });
}

function useLogout(options?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
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
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    logoutMutation,
    getProfileQuery,
    isLogin,
    getProfile,
  };
}

export default useAuth;
