import type { PublicFeatureManifest } from '@/shared/types/FeatureManifest'
import { SetupAccountView } from "@/features/setup-account/index"

export const setupAccountManifest: PublicFeatureManifest = {
  id: "setup-account",
  title: "Setup Account",
  description: "seup account by new user",
  public: true,
  path: "setup-account",
  page: SetupAccountView
};