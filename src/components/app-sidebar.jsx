'use client';

import * as React from 'react';
import {
	Command,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	HandHeart,
	Users,
	HeartHandshake,
	Calendar,
	DollarSign,
	BriefcaseBusiness,
	QrCode,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavDonationManagement } from '@/components/nav-donation-management';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

const data = {
	user: {
		name: 'user',
		email: 'user@example.com',
		avatar: '',
	},
	admin: [
		// {
		// 	title: 'Donations',
		// 	url: '/admin/donations/',
		// 	icon: HandHeart,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'Donation List',
		// 			url: '/admin/donations/',
		// 		},
		// 		{
		// 			title: 'Donate',
		// 			url: '/admin/donations/donate/',
		// 		},
		// 		{
		// 			title: 'Requests',
		// 			url: '/admin/donations/requests/',
		// 		},
		// 		{
		// 			title: 'Request Donation',
		// 			url: '/admin/donations/request-donation/',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'User Management',
		// 	url: '/admin/users/',
		// 	icon: Users,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'Users List',
		// 			url: '/admin/users/',
		// 		},
		// 		{
		// 			title: 'user List',
		// 			url: '/admin/users/users/',
		// 		},
		// 		{
		// 			title: 'Register Volunteer',
		// 			url: '/admin/users/register-volunteer/',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Donation Management',
		// 	url: '/admin/donations/',
		// 	icon: BriefcaseBusiness,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'Monetary',
		// 			url: '/admin/donation-management/monetary/',
		// 		},
		// 		{
		// 			title: 'Materialistic',
		// 			url: '/admin/donation-management/materialistic/',
		// 		},
		// 		{
		// 			title: 'Service',
		// 			url: '/admin/donation-management/service/',
		// 		},
		// 	],
		// },
	],
	volunteer: [
		// {
		// 	title: 'Donations',
		// 	url: '/volunteer/donations/',
		// 	icon: HandHeart,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'Donation List',
		// 			url: '/volunteer/donations/',
		// 		},
		// 		{
		// 			title: 'Donate',
		// 			url: '/volunteer/donations/donate/',
		// 		},
		// 		{
		// 			title: 'Requests',
		// 			url: '/volunteer/donations/requests/',
		// 		},
		// 		{
		// 			title: 'Request Donation',
		// 			url: '/volunteer/donations/request-donation/',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'User Management',
		// 	url: '/volunteer/users/',
		// 	icon: Users,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'user List',
		// 			url: '/volunteer/users/',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Donation Management',
		// 	url: '/volunteer/donations/',
		// 	icon: BriefcaseBusiness,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: 'Monetary',
		// 			url: '/volunteer/donation-management/monetary/',
		// 		},
		// 		{
		// 			title: 'Materialistic',
		// 			url: '/volunteer/donation-management/materialistic/',
		// 		},
		// 		{
		// 			title: 'Service',
		// 			url: '/volunteer/donation-management/service/',
		// 		},
		// 	],
		// },
	],
	navSecondary: [
		{
			title: 'Support',
			url: '#/',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '#/',
			icon: Send,
		},
	],
	user: [
		{
			title: 'Connect',
			url: '/user/connect/',
			icon: QrCode,
			isActive: true,
			items: [
				{
					title: 'Scan QR',
					url: '/user/connect/',
				},
				{
					title: 'Save List',
					url: '/user/connect/save-list/',
				},
			],
		},
	],
};

export function AppSidebar({ ...props }) {
	const { user } = useAppSelector((store) => store.authentication);

	const sidebarItemBasedOnUserType = {
		'super-admin': data.admin,
		admin: data.admin,
		volunteer: data.volunteer,
		user: data.user,
	};

	return (
		<Sidebar variant="inset" collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link
								href={`/${
									user?.user_type === 'super-admin' ? 'admin' : user?.user_type
								}`}
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										Whatsapp Bulk Messenger
									</span>
									<span className="truncate text-xs capitalize">
										{user?.user_type === 'super-admin'
											? 'Super Admin'
											: user?.user_type}{' '}
										Dashboard
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sidebarItemBasedOnUserType[user?.user_type]} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user || data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
