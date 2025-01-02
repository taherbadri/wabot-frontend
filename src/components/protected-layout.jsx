'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from './loading';
import { showMe } from '@/lib/features/authentication/authenticationSlice';

export default function ProtectedLayout({ children, userType }) {
	const { user, isAuthenticated, isLoading, isLoggedOut } = useAppSelector(
		(store) => store.authentication
	);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			if (!isAuthenticated) {
				await dispatch(showMe());
			}
			setIsChecking(false);
		};

		checkUser();
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		if (!isChecking && !isLoading) {
			if (!isAuthenticated) {
				if (!isLoggedOut) {
					toast.warning('Please log in to access this page.');
				}
				router.push('/login');
			} else if (
				user?.user_type !== userType &&
				user?.user_type !== 'super-admin'
			) {
				toast.error("You don't have permission to access this page.");
				router.push('/');
			}
		}
	}, [
		isAuthenticated,
		isLoading,
		isLoggedOut,
		router,
		user?.user_type,
		isChecking,
		userType,
	]);

	if (isChecking || isLoading) {
		return <Loading />; // Or a loading spinner component
	}

	return (isAuthenticated && user?.user_type === userType) ||
		user?.user_type === 'super-admin'
		? children
		: null;
}
