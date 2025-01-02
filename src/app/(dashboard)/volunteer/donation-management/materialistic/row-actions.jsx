'use client';

import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { donationActions } from '@/lib/features/donation/donationSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { customFetch } from '@/lib/utils';
import { updateStatusForMaterialOrServiceListItem } from '@/lib/features/donation/donationManagementSlice';

export function DonationItemActions({ row }) {
	const pathName = usePathname();
	const dispatch = useAppDispatch();
	const donationItem = row.original;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={`/admin/donations/details?id=${donationItem.id}`}>
						View details
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => console.log('Edit donation item:', donationItem.id)}
				>
					Edit donation item
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Toggle donation item status:', donationItem.id);
						dispatch(
							donationActions({
								action: 'update-status',
								actionId:
									donationItem.status.name === 'Available'
										? 'unavailable'
										: 'available',
								details: [donationItem.id],
							})
						);
					}}
				>
					{donationItem.status.name === 'Available'
						? 'Mark as Unavailable'
						: 'Mark as Available'}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Assign donation item:', donationItem.id);
						// You would typically open a modal or navigate to an assignment page here
					}}
				>
					Assign to volunteer
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Delete donation item:', donationItem.id);
						dispatch(
							donationActions({
								action: 'delete',
								details: [donationItem.id],
							})
						);
					}}
				>
					Delete donation item
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function MaterialStatusSelect({ row }) {
	const dispatch = useAppDispatch();
	const { materialisticListStatuses } = useAppSelector(
		(store) => store.donationManagement
	);

	const handleStatusChange = (newStatusId) => {
		console.log(
			`file: row-actions.jsx:125 - handleStatusChange - newStatusId:`,
			{
				status_id: newStatusId,
				id: row.original.id,
			}
		);

		dispatch(
			updateStatusForMaterialOrServiceListItem({
				status_id: newStatusId,
				id: row.original.id,
				type: 'materialistic',
			})
		);
	};

	return (
		<Select
			defaultValue={row.original.status.id}
			onValueChange={handleStatusChange}
		>
			<SelectTrigger className="w-32">
				<SelectValue placeholder="Select status" />
			</SelectTrigger>
			<SelectContent>
				{materialisticListStatuses.map((status) => (
					<SelectItem key={status.id} value={status.id}>
						{status.status_name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
