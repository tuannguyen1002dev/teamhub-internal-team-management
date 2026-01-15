import { AccountView } from './index'
import { UsersRound } from 'lucide-react'
import type { PrivateFeatureManifest } from '@/shared/types/FeatureManifest'

export const accountManifest: PrivateFeatureManifest = {
  id: 'account',
  title: 'Accounts',
  description: 'Manage Accounts',
  icon: UsersRound,
  sidebar: {
    order: 2,
    group: 'dashboard',
  },
  panel: AccountView,
  permissions: {
    user: ['read',],
    admin: ['read', 'write'],
  },
}
