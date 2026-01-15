import { InvitationView } from './components/_InvitationView'
import { Mail } from 'lucide-react'
import type { PrivateFeatureManifest } from '@/shared/types/FeatureManifest'

export const invitationManifest: PrivateFeatureManifest = {
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
