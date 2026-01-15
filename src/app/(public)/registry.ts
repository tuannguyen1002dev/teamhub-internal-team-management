import { loginManifest } from "@/features/auth/login/manifest"

const publicManifests = [loginManifest]

export function resolveFeatures() {
  return publicManifests
}
