import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind-friendly className merger: cn('px-2', condition && 'py-2')
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
