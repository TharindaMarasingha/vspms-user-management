import { clsx } from 'clsx'

export default function Button({ variant = 'primary', children, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 h-11 rounded-lg transition-all duration-150 ease-sprung focus-ring hover-lift'
  const styles = {
    primary: 'bg-accent text-white hover:brightness-105 active:scale-[.98] shadow-soft',
    subtle: 'bg-softgray text-slate hover:bg-gray-200',
    ghost: 'bg-transparent text-primary hover:bg-primary/10'
  }
  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  )
}

