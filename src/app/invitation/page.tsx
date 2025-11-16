'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Api from '@/shared/utils/api';

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();


  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    console.log('Invitation Page Params:', { token, email });

    // Api.get('/api/invitation/verifyEmail').then((res) => {
    //   console.log('Fetched invitations:', res.data);
    // }).catch((error) => {
    //   console.error('Error fetching invitations:', error);
    // });

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid invitation link.');
      return;
    }

    setEmail(email);

    // Call API to verify token
    const verifyInvitation = async () => {
      try {
        const res = await fetch(`/api/invitation?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus('error');
          setMessage(data.error || 'Failed to verify invitation.');
          return;
        }

        setStatus('success');
        setMessage(data.message || 'Invitation verified successfully.');
      } catch (err) {
        setStatus('error');
        setMessage('Something went wrong.');
      }
    };

    verifyInvitation();
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
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-red-600">Oops!</h1>
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    );
  }

  // Success page (first-time welcome)
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Welcome to Our Team!</h1>
        <p className="mt-3 text-gray-600">
          Hi <span className="font-medium">{email}</span>, your invitation has been verified successfully.
        </p>
        <p className="mt-4 text-gray-500">Let's get your account ready.</p>
        <button onClick={() => router.push('/the')} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
          Set Your Password
        </button>
      </div>
    </div>
  );
}
