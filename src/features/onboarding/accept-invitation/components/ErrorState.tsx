// features/invitation-acceptance/components/ErrorState.tsx
import { ShieldX } from 'lucide-react'

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="relative h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-2xl p-8 text-center">
          <p className="flex items-center gap-3 text-2xl font-bold">
            <ShieldX size={36} color="red" />
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
