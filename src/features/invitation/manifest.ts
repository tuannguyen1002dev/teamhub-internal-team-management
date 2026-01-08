import { InvitationView } from './components/_InvitationView'
import { Mail } from 'lucide-react'
import type FeatureManifest from '@/shared/types/FeatureManifest'

export const invitationManifest: FeatureManifest = {
  id: 'invitation',
  title: 'Invitations',
  description: 'Manage Invitations',
  icon: Mail,
  sidebar: {
    order: 2,
    group: 'dashboard',
  },
  panel: InvitationView,
  permissions: {
    user: ['read',],
    admin: ['read', 'write'],
  },
}
