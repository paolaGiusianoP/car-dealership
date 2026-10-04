// Color de pintura del auto, para mostrar una muestra junto al nombre del color.
const MAP: [RegExp, string][] = [
  [/rojo/i, '#c8161d'], [/azul/i, '#1f4e9c'], [/negro/i, '#15161a'], [/blanco/i, '#ecebe6'],
  [/gris|grafito|magnetic|plata/i, '#8b8e94'], [/amarillo/i, '#f2c200'], [/verde/i, '#2f6b4a'], [/naranja/i, '#e8731a'],
]
export const paintColor = (name: string) => MAP.find(([re]) => re.test(name))?.[1] ?? '#9a9a9a'
