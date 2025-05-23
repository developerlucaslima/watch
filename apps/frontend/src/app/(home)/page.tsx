import { INITIAL_PRIVATE_PAGE, INITIAL_PUBLIC_PAGE } from '@constants/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) {
    redirect(INITIAL_PUBLIC_PAGE)
  }

  redirect(INITIAL_PRIVATE_PAGE)
}
