'use client';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableCellContent } from './details-popover';
import { ColumnHeader } from '@/components/column-header';
import { DataTableRowActions } from './row-actions';
import { customFetch } from '@/lib/utils';
import { donationAction } from '@/lib/features/donation/donationSlice';

const monetaryCategories = [];
const serviceCategories = [];
const materialCategories = [];
const volunteers = [];
const categories = [];

const fetchCategories = async () => {
	try {
		const { data } = await customFetch('/categories/request');
		data.data.forEach((item) => categories.push(item));
	} catch (error) {
		console.log(`file: columns.jsx:30 - fetchCategories - error:`, error);
	}
};
fetchCategories();

const fetchVolunteers = async () => {
	try {
		const { data } = await customFetch('/users/list-users', {
			params: { per_page: 'all' },
		});
		data.data.list.forEach((item) => volunteers.push(item));
	} catch (error) {
		console.log(`file: columns.jsx:30 - fetchVolunteers - error:`, error);
	}
};
fetchVolunteers();

export const createColumns = (dispatch) => {
	return [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => {
						row.toggleSelected(!!value);
						console.log('Row selected:', row.original);
					}}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'id',
			header: ({ column }) => <ColumnHeader column={column} title="ID" />,
			cell: ({ row }) => <div>{row.getValue('id')}</div>,
		},
		{
			accessorKey: 'first_name',
			header: ({ column }) => <ColumnHeader column={column} title="Name" />,
			cell: ({ row }) => (
				<DataTableCellContent
					type="donor"
					value={`${row.getValue('first_name')} ${row.original.last_name}`}
					details={{
						id: row.original.donor_id,
						phone: row.original.contact_number,
					}}
				/>
			),
		},
		{
			accessorKey: 'category.name',
			header: 'Category',
			cell: ({ row }) => (
				<Select
					value={row.original.category.id}
					onValueChange={(value) => {
						console.log('Update category', row.original.id, value);
						// dispatch(
						// 	donationAction({
						// 		action: 'update-category',
						// 		details: [row.original.id],
						// 		actionId: value,
						// 	})
						// );
					}}
				>
					<SelectTrigger className="max-w-sm">
						<SelectValue placeholder="Select category" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => {
							return (
								<SelectItem key={category.id} value={category.id}>
									{category.category_name}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			),
		},

		{
			accessorKey: 'status.name',
			header: 'Status',
			cell: ({ row }) => (
				<div
					className="font-medium"
					style={{ color: row.original.status.color }}
				>
					{row.original.status.name}
				</div>
			),
		},

		{
			accessorKey: 'assign_to',
			header: 'Assign To',
			cell: ({ row }) => (
				<Select
					value={row.original.assign_to?.id || ''}
					onValueChange={(value) => {
						console.log('Assign to', row.original.id, value);
						// dispatch(
						// 	donationAction({
						// 		action: 'assign-volunteer',
						// 		details: [row.original.id],
						// 		actionId: value,
						// 	})
						// );
					}}
				>
					<SelectTrigger>
						<SelectValue
							placeholder={
								row.original.assign_to.first_name
									? `${row.original.assign_to.first_name} ${row.original.assign_to.last_name}`
									: 'Unassigned'
							}
						/>
					</SelectTrigger>
					<SelectContent>
						{volunteers.map((volunteer) => (
							<SelectItem
								key={volunteer.id}
								value={volunteer.id}
								className="capitalize"
							>
								{volunteer.first_name} {volunteer.last_name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			),
		},
		{
			accessorKey: 'request_data',
			header: 'Request Date',
			cell: ({ row }) => (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{new Date(row.original.request_date).toLocaleString()}
					</span>
				</div>
			),
		},
		{
			accessorKey: 'description',
			header: 'Description',
			cell: ({ row }) => (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.original.description}
					</span>
				</div>
			),
		},
		{
			id: 'actions',
			cell: ({ row }) => <DataTableRowActions row={row} />,
		},
	];
};

export default function Component({ action, id, details }) {
	return <></>;
}
