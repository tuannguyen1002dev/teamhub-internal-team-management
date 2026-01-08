import { resolveFeatures } from './registry'

export function resolvePanel(activeId: string) {
  return resolveFeatures().find((feature) =>
    (feature.id === activeId))?.panel ?? null
}
