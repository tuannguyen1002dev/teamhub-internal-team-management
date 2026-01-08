import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { PermissionsModel } from "@/types/UserType";

export default interface FeatureManifest {
  id: string;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  sidebar: SidebarConfig
  panel: () => Element | ReactNode
  permissions: PermissionsModel
}

interface SidebarConfig {
  order: number
  group?: 'management' | 'analytics' | 'settings' | 'dashboard'
}


