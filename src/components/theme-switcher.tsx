'use client'

import { useEffect, useState } from 'react'

const THEMES = [
  { id: 'gallery', label: 'Galería', color: '#c8161d' },
  { id: 'midnight', label: 'Medianoche', color: '#0f1012' },
  { id: 'racing', label: 'Racing', color: '#0f5c3a' },
]

// Herramienta para comparar estilos (y mostrarle opciones a un cliente). Se borra del layout cuando elijas uno.
export function ThemeSwitcher() {
  const [theme, setTheme] = useState('gallery')

  useEffect(() => {
    const saved = localStorage.getItem('motors-theme')
    if (saved) { setTheme(saved); document.documentElement.dataset.theme = saved }
  }, [])

  const pick = (id: string) => {
    setTheme(id)
    document.documentElement.dataset.theme = id
    localStorage.setItem('motors-theme', id)
  }

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-1 rounded-full border border-strong bg-card p-1.5 shadow-card" role="group" aria-label="Estilo del sitio">
      {THEMES.map((t) => (
        <button key={t.id} type="button" onClick={() => pick(t.id)} aria-pressed={theme === t.id} title={t.label}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === t.id ? 'bg-text text-bg' : 'text-muted hover:text-theme'}`}>
          <span className="h-3 w-3 rounded-full border border-black/20" style={{ background: t.color }} />
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  )
}
