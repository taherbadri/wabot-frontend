'use client';

import { useEffect } from 'react';
import {
	CheckCircleIcon,
	PhoneIcon,
	TruckIcon,
	ShoppingBasketIcon as BasketIcon,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchSingleDonation } from '@/lib/features/donation/donationSlice';
import { formatDate } from '@/lib/utils';
import { MonetaryDonationDetails } from './monetary-details';
import { ServiceDonationDetails } from './service-details';
import { MaterialisticDonationDetails } from './materialistic-detials';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loading from '@/components/loading';
import Remarks from '@/components/remarks';

function SingleDonationPage() {
	const params = useSearchParams().get('id');
	console.log(`file: page.jsx:24 - SingleDonationPage - params:`, params);
	const { donation, isLoading } = useAppSelector((store) => store.donation);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchSingleDonation(params));
	}, [dispatch, params]);

	if (!donation) {
		return (
			<div className="flex flex-col gap-2 h-full items-center justify-center">
				Oops! No Donation Found.
				<Button asChild>
					<Link href="/admin/donations">Back to List</Link>
				</Button>
			</div>
		);
	}

	return (
		<Card className="w-full shadow-none border-none">
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl flex items-center gap-2 justify-between">
					Donation Details
					<Button variant="secondary" asChild>
						<Link href="/admin/donations">Back to List</Link>
					</Button>
				</CardTitle>

				<Separator />
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Donor Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center space-x-4 mb-4">
									<Avatar className="h-12 w-12">
										<AvatarFallback>
											{donation.first_name[0]}
											{donation.last_name[0]}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-lg font-semibold">
											{donation.first_name} {donation.last_name}
										</p>
										<p className="text-sm text-muted-foreground">
											Donor ID: {donation.donor_id}
										</p>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center">
										<PhoneIcon className="mr-2 h-4 w-4" />
										<span>{donation.contact_number}</span>
									</div>
									{donation.details.alternate_phone && (
										<div className="flex items-center">
											<PhoneIcon className="mr-2 h-4 w-4" />
											<span>
												{donation.details.alternate_phone} (Alternate)
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Donation Overview</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<span className="font-semibold">Type:</span>
										<Badge variant="secondary">{donation.donation_type}</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="font-semibold">Category:</span>
										<Badge
											variant="outline"
											className="text-lg py-1 px-2"
											style={{
												backgroundColor: donation.category.color,
												color: '#ffffff',
											}}
										>
											{donation.category.icon === 'truck' && (
												<TruckIcon className="mr-1 h-4 w-4" />
											)}
											{donation.category.icon === 'basket' && (
												<BasketIcon className="mr-1 h-4 w-4" />
											)}
											{donation.category.name}
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="font-semibold">Date:</span>
										<span className="flex items-center">
											{formatDate(donation.donation_date)}
										</span>
									</div>
									<Separator />
									<div className="space-y-2">
										<p className="font-semibold">Category Description:</p>
										<p className="text-sm text-muted-foreground">
											{donation.category.description}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Status</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<Badge
										variant="outline"
										className="text-lg py-1 px-2"
										style={{
											backgroundColor: donation.status.color,
											color: '#ffffff',
										}}
									>
										<CheckCircleIcon className="mr-1 h-4 w-4" />
										{donation.status.name}
									</Badge>
									<p className="text-sm text-muted-foreground">
										{donation.status.description}
									</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Donation Details</CardTitle>
							</CardHeader>
							<CardContent>
								{donation.donation_type === 'Monetary' && (
									<MonetaryDonationDetails
										amount={donation.details.amount}
										paymentMethod={donation.details.payment_method}
										transactionStatus={donation.details.transaction_status}
									/>
								)}
								{donation.donation_type === 'Service' && (
									<ServiceDonationDetails
										description={donation.details.description}
										serviceValue={donation.details.service_value}
										serviceStart={donation.details.service_start}
										serviceEnd={donation.details.service_end}
									/>
								)}
								{donation.donation_type === 'Materialistic' && (
									<MaterialisticDonationDetails
										itemName={donation.details.item_name}
										description={donation.details.description}
										pickupAddress={donation.details.pickup_address}
										availabilityStart={donation.details.availability_start}
										availabilityEnd={donation.details.availability_end}
										images={donation.details.images}
									/>
								)}
							</CardContent>
						</Card>
					</div>
				)}
				<Remarks />
			</CardContent>
		</Card>
	);
}

export default SingleDonationPage;
