type AuthHeaderProps = {
  title: string
}

export function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-extrabold">{title}</h2>
    </div>
  )
}
