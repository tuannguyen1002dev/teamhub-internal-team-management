import { AccountView } from './components/_AccountView'
import { UsersRound } from 'lucide-react'
import type FeatureManifest from '@/shared/types/FeatureManifest'

export const accountManifest: FeatureManifest = {
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
