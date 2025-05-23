export const INITIAL_PUBLIC_PAGE = '/sign-in'
export const PUBLIC_ROUTES = [
  INITIAL_PUBLIC_PAGE,
  '/sign-up',
  '/forgot-password',
  '/reset-password',
]

export const INITIAL_PRIVATE_PAGE = '/videos'
export const PRIVATE_ROUTES = [INITIAL_PRIVATE_PAGE]

// export const ROUTES = {
//   HOME: '/',
//   LOGIN: '/login',
//   CALLBACK: '/callback',
//   WATCH: (id: string) => `/watch/${id}`,
// } as const

// export const API_ROUTES = {
//   AUTH: {
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//   },
//   VIDEOS: {
//     LIST: '/videos',
//     SEARCH: '/videos/search',
//     DETAIL: (id: string) => `/videos/${id}`,
//   },
// } as const
