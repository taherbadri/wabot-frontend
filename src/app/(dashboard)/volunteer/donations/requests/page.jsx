'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchRequestList } from '@/lib/features/donation/donationSlice';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DonationTable from '../donation-table';
import RequestTable from './request-table';

export default function RequestsPage() {
	const { requests } = useAppSelector((store) => store.donation);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchRequestList('all'));
	}, [dispatch]);

	return (
		<div>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">Request List</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					<RequestTable data={requests} />
				</CardContent>
			</Card>
		</div>
	);
}
