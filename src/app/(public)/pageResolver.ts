import { resolveFeatures } from './registry'

export function resolvePage(path: string) {
  return resolveFeatures().find((feature) =>
    (feature.path === path))?.page ?? null
}
