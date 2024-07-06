const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'post',
  GET_POSTS: 'getPosts',
  GET_POST: 'getPost',
  FAVORITE: 'favorite',
  FAVORITE_POSTS: 'favoritePosts',
  GET_CALENDER_POSTS: 'getCalendarPosts',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
  SHOW_LEGEND: 'showLegend',
} as const;

export {queryKeys, storageKeys};
