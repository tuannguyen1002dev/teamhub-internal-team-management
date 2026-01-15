'use client'

import { usePathname, notFound } from 'next/navigation'
import { resolvePage } from '../pageResolver'

export default function PageRender() {
  const pathname = usePathname()

  // Extract the page name from the pathname
  const pageMatch = pathname.match(/\/([^\/]+)$/)
  const page = pageMatch?.[1]

  if (!page) notFound()

  const Page = resolvePage(page)
  if (!Page) notFound()

  return Page()
}
