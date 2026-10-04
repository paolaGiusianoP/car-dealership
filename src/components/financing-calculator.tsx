'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { PLANS, monthlyPayment, usd } from '@/lib/finance'

type Props = { initialPrice?: number; carName?: string; lockPrice?: boolean }

const label = 'font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dim'
const range = 'mt-3 w-full accent-[color:var(--color-accent)]'

export function FinancingCalculator({ initialPrice = 35000, carName, lockPrice = false }: Props) {
  const [price, setPrice] = useState(initialPrice)
  const [downPct, setDownPct] = useState(30) 
  const [planIndex, setPlanIndex] = useState(1)

  const plan = PLANS[planIndex]
  const down = Math.round((price * downPct) / 100 / 100) * 100
  const financed = Math.max(0, price - down)
  const monthly = monthlyPayment(financed, plan.rate, plan.months)
  const total = monthly * plan.months

  const message = encodeURIComponent(
    `Hola! Simulé una financiación${carName ? ` para el ${carName}` : ''}: precio ${usd(price)}, anticipo ${usd(down)} (${downPct}%), ${plan.months} cuotas de ≈ ${usd(monthly)}. ¿Me ayudan a avanzar?`
  )

  return (
    <div className="rounded-theme-lg border border-theme bg-card p-8 text-theme shadow-card">
      <div className="space-y-8">
        <div>
          <div className="flex items-baseline justify-between">
            <span className={label}>Precio del auto</span>
            <span className="font-heading text-lg font-bold">{usd(price)}</span>
          </div>
          {!lockPrice && (
            <input type="range" min={10000} max={90000} step={1000} value={price} aria-label="Precio del auto"
              onChange={(e) => setPrice(Number(e.target.value))} className={range} />
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <span className={label}>Anticipo</span>
            <span className="font-heading text-lg font-bold">{usd(down)} <span className="font-body text-xs font-normal text-dim">({downPct}%)</span></span>
          </div>
          <input type="range" min={0} max={80} step={5} value={downPct} aria-label="Anticipo en porcentaje"
            onChange={(e) => setDownPct(Number(e.target.value))} className={range} />
        </div>

        <div>
          <span className={`${label} mb-3 block`}>Plan</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PLANS.map((p, i) => (
              <button key={p.months} type="button" onClick={() => setPlanIndex(i)} aria-pressed={planIndex === i}
                className={`rounded-theme-md border px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-all ${planIndex === i ? 'border-accent bg-accent text-white' : 'border-strong text-muted hover:border-accent hover:text-accent'}`}>
                {p.months} cuotas
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-theme-md border border-accent/30 bg-accent/5 p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Cuota mensual estimada</p>
          <p className="font-heading mt-2 text-5xl font-bold text-accent" aria-live="polite">{usd(monthly)}</p>
          <dl className="mt-4 space-y-1.5 border-t border-accent/20 pt-4 font-body text-xs text-muted">
            {[['Monto financiado', usd(financed)], ['Intereses totales', usd(Math.max(0, total - financed))], ['Total a pagar', usd(total + down)], ['Tasa mensual de referencia', `${(plan.rate * 100).toFixed(1).replace('.', ',')} %`]].map(([k, v]) => (
              <div key={k} className="flex justify-between"><dt>{k}</dt><dd className="font-mono text-theme">{v}</dd></div>
            ))}
          </dl>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
            Quiero esta cuota →
          </a>
          <p className="mt-4 font-body text-[11px] leading-relaxed text-dim">
            * Estimación orientativa. Las condiciones finales dependen del análisis crediticio y del banco elegido.
          </p>
        </div>
      </div>
    </div>
  )
}
