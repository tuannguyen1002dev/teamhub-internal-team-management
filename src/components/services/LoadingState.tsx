// features/invitation-acceptance/components/LoadingState.tsx
export default function LoadingState({ waitingMessages }: { waitingMessages: string }) {
  return (
    <div className="flex h-screen items-center justify-center text-gray-500">
      {waitingMessages}...
    </div>
  )
}
