'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnHeader } from '@/components/column-header';

import { UserDataTableCellContent } from './details-popover';
import { UserDataTableRowActions } from './row-actions';

export const columns = [
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
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => <ColumnHeader column={column} title="ID" />,
		cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <UserDataTableCellContent user={row.original} />,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <ColumnHeader column={column} title="Email" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('email')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'contact_number',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Phone Number" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('contact_number')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => <ColumnHeader column={column} title="Type" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('type')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'is_active',
		header: ({ column }) => <ColumnHeader column={column} title="Status" />,
		cell: ({ row }) => {
			const isActive = row.getValue('is_active') === '1';
			return (
				<div
					className={`font-medium ${
						isActive ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{isActive ? 'Active' : 'Inactive'}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <UserDataTableRowActions row={row} />,
	},
];
