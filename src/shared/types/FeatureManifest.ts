import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { PermissionsModel } from "@/types/UserType";

interface CoreFeatureManifest {
  id: string;
  title: string;
  description: string;
}

export interface PublicFeatureManifest extends CoreFeatureManifest {
  public: boolean;
  page: () => Element | ReactNode
  path: string
}

export interface PrivateFeatureManifest extends CoreFeatureManifest {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  sidebar: SidebarConfig
  permissions: PermissionsModel
  panel: () => Element | ReactNode
}

interface SidebarConfig {
  order: number
  group?: "management" | "analytics" | "settings" | "dashboard"
}
