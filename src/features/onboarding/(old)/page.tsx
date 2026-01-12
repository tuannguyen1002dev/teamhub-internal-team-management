'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Api from '@/shared/utils/api';
import { ShieldX } from "lucide-react"

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();


  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [invitationEmail, setInvitationEmail] = useState('')
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    // TODO: verify invitation token via API

    if (!token) {
      setStatus('error');
      setMessage('Invalid invitation link.');
      return;
    }

    // Call API to verify token
    Api.get(`/api/invitation?token=${encodeURIComponent(token)}`)
      .then((res) => {
        setInvitationEmail(res.data.email)
        setStatus('success');
        setMessage(res.data.message || 'Invitation verified successfully.');
      }).catch((err) => {
        setStatus('error');
        console.log(err.response.data)
        setMessage(err.response?.data?.error || 'Something went wrong.');
      });

  }, [searchParams]);

  // UI states
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Verifying your invitation...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-blend-soft-light">
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-[80%] h-[80%] animate-fade-in flex justify-center items-center">
            <p className="flex justify-center items-center gap-3">
              <ShieldX size={36} color={"red"} /> <span className="font-bold text-2xl">{message}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success page (welcome)
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Welcome to Our Team!</h1>
        <p className="mt-3 text-gray-600">
          Hi <span className="font-medium">{invitationEmail}</span>, your invitation has been verified successfully.
        </p>
        <p className="mt-4 text-gray-500">Let's get your account ready.</p>
        <button onClick={() => router.push('/onboard-invitation/setup-account')} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
          Setup Your Account
        </button>
      </div>
    </div>
  );
}
