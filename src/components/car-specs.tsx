import type { Car } from '@/types/car'

const FUEL_LABELS: Record<string, string> = {
  Gasoline: 'Nafta',
  Diesel: 'Diésel',
  Hybrid: 'Híbrido',
  Electric: 'Eléctrico',
}

const TRANSMISSION_LABELS: Record<string, string> = {
  Manual: 'Manual',
  Automatic: 'Automática',
}

type Props = {
  car: Car
}

export function CarSpecs({ car }: Props) {
  const specs = [
    { label: 'Año', value: car.year.toString() },
    {
      label: 'Kilometraje',
      value:
        car.mileage === 0
          ? '0 km'
          : new Intl.NumberFormat('es-UY').format(car.mileage) + ' km',
    },
    { label: 'Combustible', value: FUEL_LABELS[car.fuel] ?? car.fuel },
    { label: 'Transmisión', value: TRANSMISSION_LABELS[car.transmission] ?? car.transmission },
    { label: 'Color', value: car.color },
    { label: 'Puertas', value: car.doors.toString() },
  ]

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label} className="border-t border-theme pt-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-dim">
            {spec.label}
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-theme">
            {spec.value}
          </p>
        </div>
      ))}
    </div>
  )
}