import { Toaster, type ToasterProps } from 'sonner'

const Sonner = (props: ToasterProps) => {
  return (
    <Toaster
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Sonner }
