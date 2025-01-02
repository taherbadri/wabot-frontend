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
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState, useEffect } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { updateStatusForMaterialOrServiceListItem } from '@/lib/features/donation/donationManagementSlice';

export function ServiceItemActions({ row }) {
	const pathName = usePathname();
	const dispatch = useAppDispatch();
	const serviceItem = row.original;

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
					<Link href={`/admin/services/details?id=${serviceItem.id}`}>
						View details
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => console.log('Edit service item:', serviceItem.id)}
				>
					Edit service item
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Toggle service item status:', serviceItem.id);
						// dispatch(
						// 	serviceActions({
						// 		action: 'update-status',
						// 		actionId:
						// 			serviceItem.status.name === 'Available'
						// 				? 'unavailable'
						// 				: 'available',
						// 		details: [serviceItem.id],
						// 	})
						// );
					}}
				>
					{serviceItem.status.name === 'Available'
						? 'Mark as Unavailable'
						: 'Mark as Available'}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Assign service item:', serviceItem.id);
						// You would typically open a modal or navigate to an assignment page here
					}}
				>
					Assign to volunteer
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Delete service item:', serviceItem.id);
						// dispatch(
						// 	serviceActions({
						// 		action: 'delete',
						// 		details: [serviceItem.id],
						// 	})
						// );
					}}
				>
					Delete service item
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function ServiceStatusSelect({ row }) {
	const dispatch = useAppDispatch();
	const { serviceListStatuses } = useAppSelector(
		(store) => store.donationManagement
	);

	const handleStatusChange = (newStatusId) => {
		console.log(
			`file: row-actions.jsx:131 - handleStatusChange - newStatusId:`,
			{
				status_id: newStatusId,
				id: row.original.id,
			}
		);
		dispatch(
			updateStatusForMaterialOrServiceListItem({
				status_id: newStatusId,
				id: row.original.id,
				type: 'service',
			})
		);
	};

	return (
		<Select
			defaultValue={row.original.status.id}
			onValueChange={handleStatusChange}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select status" />
			</SelectTrigger>
			<SelectContent>
				{serviceListStatuses.map((status) => (
					<SelectItem key={status.id} value={status.id}>
						{status.status_name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
