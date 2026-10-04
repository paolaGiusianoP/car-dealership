'use client'

import { useEffect, useState } from 'react'

// Horarios de config/site.ts: lun-vie 9-19, sáb 10-14
const isOpen = (d: Date) => {
  const day = d.getDay(), h = d.getHours() + d.getMinutes() / 60
  if (day >= 1 && day <= 5) return h >= 9 && h < 19
  if (day === 6) return h >= 10 && h < 14
  return false
}

export function OpenNow() {
  const [open, setOpen] = useState<boolean | null>(null)
  useEffect(() => { setOpen(isOpen(new Date())) }, [])
  if (open === null) return null
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest">
      <span className={`h-2 w-2 rounded-full ${open ? 'animate-pulse bg-green-500' : 'bg-red-500'}`} />
      {open ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  )
}
