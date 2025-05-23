import { Loader2 } from 'lucide-react'

type LoaderProps = {
  text?: string
  size?: number
}

export const Loader = ({ size = 16, text }: LoaderProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Loader2 className="text-primary animate-spin" size={size} />
      {text && <span className="text-muted-foreground text-sm">{text}</span>}
    </div>
  )
}
