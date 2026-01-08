export type NavLink = {
  key: string
  title: string
  path?: string
  feature: string
  icon?: any
  externalLink?: boolean
  openInNewTab?: boolean
}

export type NavSectionTitle = {
  subject?: string
  sectionTitle: string
}

export type NavGroup = {
  icon?: any
  title: string
  children?: (NavGroup | NavLink)[]
}

export type VerticalNavItemsType = (NavLink | NavSectionTitle | NavGroup)[]