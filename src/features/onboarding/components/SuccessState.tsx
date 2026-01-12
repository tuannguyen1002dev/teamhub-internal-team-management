// features/invitation-acceptance/components/SuccessState.tsx
export function SuccessState({
  email,
  onContinue,
}: {
  email: string
  onContinue: () => void
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center">
        <h1 className="text-3xl font-bold">🎉 Welcome!</h1>
        <p className="mt-3 text-gray-600">
          Hi <span className="font-medium">{email}</span>
        </p>
        <button onClick={onContinue} className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white">
          Setup Your Account
        </button>
      </div>
    </div>
  )
}
