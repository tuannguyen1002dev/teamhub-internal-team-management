import { loginManifest } from "@/features/auth/login/manifest"
import { acceptInvitationManifest } from "@/features/onboarding/accept-invitation/manifest"
import { setupAccountManifest } from "@/features/onboarding/setup-account/manifest"

const publicManifests = [
  loginManifest,
  acceptInvitationManifest,
  setupAccountManifest
]

export function resolveFeatures() {
  return publicManifests
}
