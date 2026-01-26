import type { PublicFeatureManifest } from '@/shared/types/FeatureManifest'
import { LoginForm } from "@/features/auth/index"

export const loginManifest: PublicFeatureManifest = {
  id: "login",
  title: "Login",
  description: "Secure authentication gateway",
  public: true,
  path: "login",
  page: LoginForm
};