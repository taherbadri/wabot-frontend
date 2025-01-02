'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchUsers } from '@/lib/features/user/userSlice';
import UserTable from './user-table';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DonationsPage() {
	const { users } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">user List</CardTitle>

					<Separator />
				</CardHeader>
				<CardContent>
					<UserTable data={users} />
				</CardContent>
			</Card>
		</div>
	);
}
