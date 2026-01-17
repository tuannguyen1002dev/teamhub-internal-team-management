'use client';
import { SetupAccountForm } from "./SetupAccountForm"

export function SetupAccountView() {

  return (
    <div className="ground-page-container">
      <div className="ground-page-layout">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 flex flex-row gap-3 w-[70%] rounded-xl">
          <div className="ads-panel w-[90%] shadow-[0px_0px_15px_-5px_rgba(0,0,0,0.5)] bg-white rounded-tl-xl rounded-bl-xl text-black p-0">
            <img src="/login-ads.jpg" className="rounded-tl-xl rounded-bl-xl" />
          </div>
          <SetupAccountForm />
        </div>
      </div>
    </div>
  )
}