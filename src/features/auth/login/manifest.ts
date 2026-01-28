import type { PublicFeatureManifest } from '@/shared/types/FeatureManifest'
import { LoginForm } from "./ui/LoginForm"

export const loginManifest: PublicFeatureManifest = {
  id: "login",
  title: "login",
  description: "login",
  public: true,
  path: "login",
  page: LoginForm
};