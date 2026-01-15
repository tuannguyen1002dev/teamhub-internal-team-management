// features/invitation-acceptance/components/SuccessState.tsx
export function SuccessState({
  email,
  onContinue,
}: {
  email: string
  onContinue: () => void
}) {
  return (
    <div className="ground-page-container">
      <div className="ground-page-layout">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-[400px] animate-fade-in flex flex-col gap-12 text-center">
          <h1 className="text-4xl font-bold">🎉 Welcome!</h1>
          <p className="text-xl text-white font-bold">
            Hi <span className="font-medium underline">{email}</span>
          </p>
          <button onClick={onContinue} className=" w-full rounded-xl bg-blue-600 py-2 font-bold text-white cursor-pointer">
            Setup Your Account
          </button>
        </div>
      </div>
    </div>
  )
}
