import type { PublicFeatureManifest } from '@/shared/types/FeatureManifest'
import { AcceptInvitationView } from "@/features/onboarding/accept-invitation/index"

export const acceptInvitationManifest: PublicFeatureManifest = {
  id: "accept-invitation",
  title: "Accept Invitation",
  description: "confirmation acceptant of new user",
  public: true,
  path: "accept-invitation",
  page: AcceptInvitationView
};