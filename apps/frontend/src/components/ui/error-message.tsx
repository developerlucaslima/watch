interface ErrorMessageProps {
  error?: string
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <p
    className={`min-h-[1rem] text-xs text-red-500 transition-opacity ${
      error ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {error || ' '}
  </p>
)
