import { invitationManifest } from "@/features/invitation/manifest"
import { accountManifest } from "@/features/account/manifest"

const manifests = [invitationManifest, accountManifest]

export function resolveFeatures() {
  return manifests
}
