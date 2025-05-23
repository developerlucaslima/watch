import { cookies } from 'next/headers'

export async function apiServerSide(
  input: RequestInfo | URL,
  init: RequestInit = {},
) {
  const cookieHeader = cookies().toString()

  const config: RequestInit = {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
      Cookie: cookieHeader,
    },
  }

  let res = await fetch(input, config)

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token/user-refresh`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Cookie: cookieHeader,
        },
      },
    )

    if (!refreshRes.ok) {
      return new Response('Unauthorized', { status: 401 })
    }

    res = await fetch(input, config)
  }

  return res
}
