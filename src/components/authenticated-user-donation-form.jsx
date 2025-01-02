'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SelectDonationTypeForm } from './donation-form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useEffect } from 'react';
import { setPhoneNumber } from '@/lib/features/donation/donateSlice';

export default function AuthenticatedUserDonationForm() {
	const { user } = useAppSelector((store) => store.authentication);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (user?.contact_number) {
			dispatch(setPhoneNumber(user.contact_number));
		}
	}, [dispatch, user]);

	return <SelectDonationTypeForm />;
}
