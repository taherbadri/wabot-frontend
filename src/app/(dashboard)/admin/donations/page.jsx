'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import DonationTable from './donation-table';
import { useEffect } from 'react';
import { fetchDonations } from '@/lib/features/donation/donationSlice';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DonationsPage() {
	const { donations } = useAppSelector((store) => store.donation);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchDonations('all'));
	}, [dispatch]);

	return (
		<div>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">Donation List</CardTitle>

					<Separator />
				</CardHeader>
				<CardContent>
					<DonationTable data={donations} />
				</CardContent>
			</Card>
		</div>
	);
}
