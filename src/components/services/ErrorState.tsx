// features/invitation-acceptance/components/ErrorState.tsx
import { LucideProps } from 'lucide-react'
import { RefAttributes, ForwardRefExoticComponent } from 'react'

type IconType = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

export default function ErrorState({ icon: Icon, ErrorMessage }: { icon?: IconType; ErrorMessage: string }) {
  return (
    <div className="relative h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-2xl p-8 text-center">
          <p className="flex items-center gap-3 text-2xl font-bold">
            {Icon && <Icon size={36} color="red" />}
            {ErrorMessage}
          </p>
        </div>
      </div>
    </div>
  )
}
