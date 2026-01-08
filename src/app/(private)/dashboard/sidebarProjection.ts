import { resolveFeatures } from './registry'

export function getSidebarItems() {
  return resolveFeatures()
    .filter((feature) => feature.sidebar)
    .sort((a, b) => a.sidebar.order - b.sidebar.order)
    .map((feature) => ({
      id: feature.id,
      title: feature.title,
      icon: feature.icon,
      path: `/dashboard/${feature.id}`,
    }))
}