import { notFound } from 'next/navigation'
import { resolvePanel } from '../panelResolver'

type Props = {
  params: Promise<{ panel: string }>
}

export default async function DashboardPanel({ params }: Props) {
  const { panel } = await params

  const Panel = resolvePanel(panel)

  if (!Panel) {
    notFound()
  }

  return Panel()
}
