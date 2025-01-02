'use client';
import { InputOTPForm } from '@/components/input-otp-form';
import { LoginForm } from '@/components/login-form';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const { isLoading, isEnterOTP, user, isLoggedOut, isAuthenticated } =
		useAppSelector((store) => store.authentication);
	const router = useRouter();

	useEffect(() => {
		console.log(isLoggedOut);
		if (isLoggedOut) return;
		if (user && isAuthenticated) {
			switch (user.user_type) {
				case 'super-admin':
					router.push('/admin/');
					break;
				case 'admin':
					router.push('/admin/');
					break;
				case 'agent':
					router.push('/agent/');
					break;
				default:
					router.push('/user/connect/');
					break;
			}
		}
	}, [user, router, isLoggedOut, isAuthenticated]);
	console.log(`file: page.jsx:34 - useEffect - user:`, user);
	console.log(`file: page.jsx:32 - useEffect - isLoggedOut:`, isLoggedOut);

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			{isEnterOTP ? <InputOTPForm /> : <LoginForm />}
		</div>
	);
}
