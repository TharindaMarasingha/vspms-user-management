import { clsx } from 'clsx'

export default function Chip({ color = 'soft', children }) {
  const style = {
    soft: 'bg-softgray text-slate',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger'
  }[color]
  return <span className={clsx('text-xs px-2 py-1 rounded-full', style)}>{children}</span>
}

