export type NavLink = {
    icon?: any
    path?: string
    title: string
    disabled?: boolean
    externalLink?: boolean
    openInNewTab?: boolean
  }
  
  export type NavGroup = {
    icon?: any
    title: string
    children?: (NavGroup | NavLink)[]
  }
  
  export type NavSectionTitle = {
    subject?: string
    sectionTitle: string
  }
  
  export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]