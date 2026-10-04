'use client'

import { useState } from 'react'
import type { Car } from '@/types/car'
import { siteConfig } from '@/config/site'

type Props = {
  cars: Car[]
}

type FormState = {
  name: string
  phone: string
  email: string
  interestedIn: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  interestedIn: '',
  message: '',
}

const inputClass =
  'w-full rounded-theme-md border border-strong bg-card px-4 py-3 font-body text-sm text-theme outline-none transition-colors placeholder:text-dim focus:border-accent'

const labelClass =
  'mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dim'

export function ContactForm({ cars }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = 'Ingresá tu nombre'
    if (!form.phone.trim()) next.phone = 'Ingresá tu teléfono'
    if (!form.email.trim()) {
      next.email = 'Ingresá tu email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Email inválido'
    }
    if (!form.message.trim()) next.message = 'Contanos en qué podemos ayudarte'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const text = [
      `Hola! Soy ${form.name}.`,
      form.interestedIn ? `Me interesa: ${form.interestedIn}.` : null,
      form.message,
      '',
      `Tel: ${form.phone}`,
      `Email: ${form.email}`,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setStatus('success')
    setForm(INITIAL)
    setTimeout(() => setStatus('idle'), 8000)
  }

  if (status === 'success') {
    return (
      <div className="rounded-theme-lg border border-strong bg-card p-10 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-theme">
          ¡Mensaje enviado!
        </h3>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted">
          Se abrió WhatsApp con tu mensaje listo para enviar. Si no se abrió, escribinos
          directamente al {siteConfig.phone}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {/* Nombre + Teléfono */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Nombre *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Ej. Pedro Pérez"
            className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="mt-1.5 font-body text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Teléfono *
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+598 99 000 000"
            className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="mt-1.5 font-body text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass} htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="tu@email.com"
          className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="mt-1.5 font-body text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Auto de interés */}
      <div>
        <label className={labelClass} htmlFor="interestedIn">
          Auto de interés (opcional)
        </label>
        <select
          id="interestedIn"
          value={form.interestedIn}
          onChange={(e) => update('interestedIn', e.target.value)}
          className={inputClass}
        >
          <option value="">No especificado</option>
          {cars.map((car) => (
            <option key={car.id} value={`${car.brand} ${car.model} ${car.year}`}>
              {car.brand} {car.model} {car.year} · US$ {car.price.toLocaleString('en-US')}
            </option>
          ))}
          <option value="Otro">Otro / Consulta general</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label className={labelClass} htmlFor="message">
          Mensaje *
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Contanos qué buscás, si querés financiación, si querés coordinar un test drive..."
          className={`${inputClass} resize-none ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && (
          <p className="mt-1.5 font-body text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar por WhatsApp →'}
      </button>

      <p className="text-center font-body text-xs text-dim">
        Te respondemos en menos de 24 horas hábiles.
      </p>
    </form>
  )
}