import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="label-eyebrow">Error 404</p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-theme sm:text-6xl">
          No encontramos esta página
        </h1>
        <p className="mt-4 font-body text-base text-muted">
          Puede que el auto ya se haya vendido, o que el link esté roto.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/cars" className="btn-primary">
            Ver catálogo →
          </Link>
          <Link href="/" className="btn-secondary">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}