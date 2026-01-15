import type { PublicFeatureManifest } from '@/shared/types/FeatureManifest'
import { LoginForm } from "@/features/auth/login/index"

export const loginManifest: PublicFeatureManifest = {
  id: "login",
  title: "login",
  description: "login",
  public: true,
  path: "login",
  page: LoginForm
};