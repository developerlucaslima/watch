import Link from 'next/link'

type AuthBottomProps = {
  question: string
  linkText: string
  linkHref: string
}

export function AuthFooter({ question, linkText, linkHref }: AuthBottomProps) {
  return (
    <div className="text-center">
      <p className="mt-2 text-sm">
        {question}{' '}
        <Link
          href={linkHref}
          className="text-primary hover:text-primary/90 font-medium"
        >
          {linkText}
        </Link>
      </p>
    </div>
  )
}
