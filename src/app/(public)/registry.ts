import { loginManifest } from "@/features/auth/login/manifest"
import { acceptInvitationManifest } from "@/features/accept-invitation/manifest"
import { setupAccountManifest } from "@/features/setup-account/manifest"

const publicManifests = [
  loginManifest,
  acceptInvitationManifest,
  setupAccountManifest
]

export function resolveFeatures() {
  return publicManifests
}
