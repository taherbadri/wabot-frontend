'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { LineChartComponent, PieChartComponent } from '@/components/chart';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Book,
	CheckCircle,
	CheckSquare,
	EggFried,
	FileLock,
	HeartHandshake,
	HeartPulse,
	HelpCircle,
	Hourglass,
	ShoppingBag,
	XCircle,
	ClipboardCheck,
	Loader,
	Wrench,
	Package,
	Coins,
	Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	donationCounts,
	donationCountsByCategory,
	donationCountsByStatus,
	donationCountsByTime,
	donationCountsByType,
	donationCountsByVolunteer,
	donationCountsByusers,
	volunteerCounts,
	userDonationCountsByType,
} from '@/lib/features/widgets/widgetsSlice';
import { LoadingDashboard } from '@/components/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const icons = {
	'bi-bag': <ShoppingBag />,
	'bi-egg-fried': <EggFried />,
	'bi-heart-pulse': <HeartPulse />,
	'bi-journal-bookmark': <Book />,
	'bi-question-circle': <HelpCircle />,
	'bi-hourglass-split': <Hourglass />,
	'bi-check-circle': <CheckCircle />,
	'bi-x-circle': <XCircle />,
	'bi-check-square': <CheckSquare />,
	'bi-file-earmark-lock': <FileLock />,
};

export default function Dashboard() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((store) => store.authentication);
	const userType = user?.user_type;
	const {
		totalDonationCounts,
		isLoading,
		donationFrequencyData,
		donationTypeData,
		donationCategories,
		donationStatuses,
		donationsByVolunteer,
		donationsByuser,
		volunteerStats,
		userDonationTypes,
	} = useAppSelector((store) => store.widgets);
	useEffect(() => {
		dispatch(donationCounts());
		dispatch(donationCountsByTime('day'));
		dispatch(donationCountsByType());
		dispatch(donationCountsByCategory());
		dispatch(donationCountsByStatus());
		dispatch(donationCountsByVolunteer());
		dispatch(donationCountsByusers());
		dispatch(volunteerCounts());
		dispatch(userDonationCountsByType());
	}, [dispatch]);

	const stats = [
		{
			title: 'Total Donations',
			icon: HeartHandshake,
			value: totalDonationCounts?.total_donations,
			description: 'Total number of donations',
		},
		{
			title: 'Completed',
			icon: ClipboardCheck,
			value: totalDonationCounts?.total_completed_donations,
			description: 'Total number of donations',
		},
		{
			title: 'Working',
			icon: Hourglass,
			value: totalDonationCounts?.total_working_donations,
			description: 'Total working donations',
		},
		{
			title: 'Pending',
			icon: Loader,
			value: totalDonationCounts?.total_pending_donations,
			description: 'Total pending donations',
		},
		{
			title: 'Rejected',
			icon: XCircle,
			value: totalDonationCounts?.total_rejected_donations,
			description: 'Total rejected donations',
		},
		...(userType === 'admin' || userType === 'super-admin'
			? [
					{
						title: 'Unassigned',
						icon: HelpCircle,
						value: totalDonationCounts?.total_unassigned_donations,
						description: 'Total unassigned donations',
					},
			  ]
			: []),
	];

	if (isLoading) {
		return <LoadingDashboard />;
	}

	return (
		<>
			<div
				className={`grid auto-rows-min gap-4 md:grid-cols-3 ${
					userType === 'admin' || userType === 'super-admin'
						? 'lg:grid-cols-6'
						: 'lg:grid-cols-5'
				}`}
			>
				{stats.map(({ title, icon: Icon, value, description }, i) => (
					<Card key={i}>
						<CardHeader>
							<CardTitle className={'flex justify-between items-center'}>
								<span>{title}</span>
								<Icon />
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-4xl font-bold">{value}</p>
							<CardDescription>{description}</CardDescription>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="min-h-[100dvh] flex-1 rounded-xl md:min-h-min">
				<section className="grid gap-4 lg:grid-cols-12">
					<Card className={'lg:col-span-8 shadow'}>
						<CardHeader className={'flex-row justify-between items-center'}>
							<CardTitle className={'flex-1'}>
								<span>Donation Frequency</span>
								<CardDescription>
									Count of donations and their frequency
								</CardDescription>
							</CardTitle>
							<Select onValueChange={(e) => dispatch(donationCountsByTime(e))}>
								<SelectTrigger className={'w-min'}>
									<SelectValue placeholder="Change Frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="day">Daily</SelectItem>
										<SelectItem value="month">Monthly</SelectItem>
										<SelectItem value="year">Yearly</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</CardHeader>
						<CardContent>
							<LineChartComponent data={donationFrequencyData} />
						</CardContent>
					</Card>
					<Card className={'lg:col-span-4 shadow'}>
						<CardHeader>
							<CardTitle>
								<span>Donation Type</span>
								<CardDescription>
									Count of donation types and their total
								</CardDescription>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<PieChartComponent data={donationTypeData} />
						</CardContent>
					</Card>
				</section>
			</div>
			<div className="flex-1 rounded-xl">
				<section className="grid gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Donation Count by Status</CardTitle>
							<CardDescription>Donation count ny statuses</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-5 gap-4">
								{donationStatuses?.map((donation, i) => (
									<Card key={i}>
										<CardHeader>
											<CardTitle
												className={'flex justify-between items-center'}
											>
												<span>{donation.status_name}</span>
												{icons[donation.icon]}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-4xl font-bold">
												{donation.total_donations}
											</p>
											<CardDescription>{donation.description}</CardDescription>
										</CardContent>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Donation Count by Category</CardTitle>
							<CardDescription>Donation count ny categories</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-5 gap-4">
								{donationCategories?.map((donation, i) => (
									<Card key={i}>
										<CardHeader>
											<CardTitle
												className={'flex justify-between items-center'}
											>
												<span>{donation.category_name}</span>
												{icons[donation.icon]}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-4xl font-bold">
												{donation.total_donations}
											</p>
											<CardDescription>{donation.description}</CardDescription>
										</CardContent>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
			<div className="flex-1 rounded-xl">
				<section className="grid gap-4 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Donations by Volunteers</CardTitle>
							<CardDescription>
								Total donations made by each volunteer
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{donationsByVolunteer?.map(
									(volunteer, i) =>
										volunteer && (
											<div
												key={i}
												className="flex items-center justify-between"
											>
												<div className="flex items-center space-x-4">
													<Avatar>
														<AvatarImage
															src={
																volunteer.profile_photo_path ||
																'/placeholder.svg'
															}
														/>
														<AvatarFallback>
															{volunteer.first_name[0]}
															{volunteer.last_name[0]}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium">
															{volunteer.first_name} {volunteer.last_name}
														</p>
														<p className="text-sm text-muted-foreground">
															{volunteer.email}
														</p>
													</div>
												</div>
												<p className="text-2xl font-bold">
													{volunteer.total_donations}
												</p>
											</div>
										)
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Donations by users</CardTitle>
							<CardDescription>
								Total donations made by each user
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{donationsByuser?.map(
									(user, i) =>
										user && (
											<div
												key={i}
												className="flex items-center justify-between"
											>
												<div className="flex items-center space-x-4">
													<Avatar>
														<AvatarImage
															src={
																user.profile_photo_path || '/placeholder.svg'
															}
														/>
														<AvatarFallback>
															{user.first_name[0]}
															{user.last_name[0]}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium">
															{user.first_name} {user.last_name}
														</p>
														<p className="text-sm text-muted-foreground">
															{user.email}
														</p>
													</div>
												</div>
												<p className="text-2xl font-bold">
													{user.total_donations}
												</p>
											</div>
										)
								)}
							</div>
						</CardContent>
					</Card>
				</section>
			</div>

			{(userType === 'admin' || userType === 'super-admin') && (
				<div className="flex-1 rounded-xl">
					<section className="grid gap-4 lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>user Donation Types</CardTitle>
								<CardDescription>
									Breakdown of donation types from users
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-4">
									<Card>
										<CardHeader>
											<CardTitle className="flex justify-between items-center">
												<span>Monetary</span>
												<Coins />
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-2xl font-bold">
												{userDonationTypes?.total_monetary_donations}
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle className="flex justify-between items-center">
												<span>Total Amount</span>
												<Package />
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-2xl font-bold">
												&#x20B9;
												{userDonationTypes?.total_monetary_donations_amount}
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle className="flex justify-between items-center">
												<span>Materialistic</span>
												<Package />
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-2xl font-bold">
												{userDonationTypes?.total_materialistic_donations}
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle className="flex justify-between items-center">
												<span>Service</span>
												<Wrench />
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-2xl font-bold">
												{userDonationTypes?.total_service_donations}
											</p>
										</CardContent>
									</Card>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Volunteer Stats</CardTitle>
								<CardDescription>
									Overview of volunteer participation
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-center h-full">
									<div className="text-center">
										<Users className="h-16 w-16 mx-auto mb-4" />
										<p className="text-4xl font-bold">
											{volunteerStats?.total_volunteers}
										</p>
										<p className="text-xl text-muted-foreground">
											Total Volunteers
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			)}
		</>
	);
}
