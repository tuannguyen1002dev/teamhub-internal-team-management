import { loginManifest } from "@/features/auth/login/manifest"
import { acceptInvitationManifest } from "@/features/onboarding/accept-invitation/manifest"

const publicManifests = [
  loginManifest,
  acceptInvitationManifest,
]

export function resolveFeatures() {
  return publicManifests
}
