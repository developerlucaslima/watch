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

export const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
]

export const PRIVATE_ROUTES = ['/videos']
