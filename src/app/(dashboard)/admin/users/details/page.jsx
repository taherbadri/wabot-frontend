'use client';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
	useParams,
	usePathname,
	useSearchParams,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchUserDetails } from '@/lib/features/user/userSlice';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Remarks from '@/components/remarks';

export default function UserDetails() {
	const userId = useSearchParams().get('id');
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((store) => store.user);

	const route =
		userData?.type === 'user' ? '/admin/users/users' : '/admin/users';

	useEffect(() => {
		dispatch(fetchUserDetails(userId));
	}, [dispatch, userId]);

	const userDataMock = {
		id: '7',
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@gmail.com',
		contact_number: '6543219445',
		gender: null,
		dob: null,
		address: 'Indore',
		city: 'Indore',
		state: 'Madhya Pradesh',
		country: 'India',
		pincode: '452001',
		is_active: '1',
		type: 'admin',
		role_id: null,
		profile_photo_path: null,
	};

	return (
		<div className="h-full flex items-center justify-center p-4">
			<Card className="w-full max-w-3xl shadow-lg">
				<CardHeader className="flex flex-row items-center gap-4">
					<Avatar className="w-20 h-20">
						<AvatarFallback className="text-2xl capitalize">
							{userData?.first_name[0]}
							{userData?.last_name[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-xl md:text-2xl capitalize">
							{userData?.first_name} {userData?.last_name}
						</CardTitle>
						<Badge variant="secondary" className="mt-1">
							{userData?.type}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Mail className="text-gray-500" />
								<span>{userData?.email}</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="text-gray-500" />
								<span>{userData?.contact_number}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="text-gray-500" />
								<span>
									{userData?.address}, {userData?.city}, {userData?.state},{' '}
									{userData?.country} - {userData?.pincode}
								</span>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Additional Information</h3>
							<Separator className="my-2" />
							<dl className="space-y-2">
								<div className="flex justify-between">
									<dt className="font-medium text-gray-500">User ID</dt>
									<dd>{userData?.id}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="font-medium text-gray-500">Status</dt>
									<dd>{userData?.is_active === '1' ? 'Active' : 'Inactive'}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="font-medium text-gray-500">Gender</dt>
									<dd>{userData?.gender || 'Not specified'}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="font-medium text-gray-500">Date of Birth</dt>
									<dd>{userData?.dob || 'Not specified'}</dd>
								</div>
							</dl>
						</div>
					</div>
					<Remarks />
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button asChild variant={'secondary'}>
						<Link href={route}>Back to list</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
