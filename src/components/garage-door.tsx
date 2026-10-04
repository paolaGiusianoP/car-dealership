import type { ReactNode } from 'react'

export function Slats({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`slats relative flex flex-col items-center justify-center text-on-ink ${className}`}>
      {children}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-[#0d0b09]" />
    </div>
  )
}
