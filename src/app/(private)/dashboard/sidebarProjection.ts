import { resolveFeatures } from './registry'
import { AccountRole } from '@/types/UserType'

export function getSidebarItems(role?: AccountRole) {
  return resolveFeatures()
    .filter((feature) => {
      if (!feature.sidebar) return false;
      if (!role) return false;

      // Filter by role if permissions are defined in manifest
      if (feature.permissions) {
        const rolePermissions = (feature.permissions as any)[role.toLowerCase()];
        if (!rolePermissions || rolePermissions.length === 0) return false;
      }

      return true;
    })
    .sort((a, b) => a.sidebar!.order - b.sidebar!.order)
    .map((feature) => ({
      id: feature.id,
      title: feature.title,
      icon: feature.icon,
      path: `/dashboard/${feature.id}`,
    }))
}