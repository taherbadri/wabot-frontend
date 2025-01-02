'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnHeader } from '@/components/column-header';

import { AccountDataTableCellContent } from './details-popover';
import { AccountDataTableRowActions } from './row-actions';

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
		accessorKey: 'account_name',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Account Name" />
		),
		cell: ({ row }) => <AccountDataTableCellContent account={row.original} />,
	},
	{
		accessorKey: 'account_type',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Account Type" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('account_type')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'balance',
		header: ({ column }) => <ColumnHeader column={column} title="Balance" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						₹{parseFloat(row.getValue('balance')).toFixed(2)}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'bank_name',
		header: ({ column }) => <ColumnHeader column={column} title="Bank Name" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('bank_name') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'account_number',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Account Number" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('account_number') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'ifsc_code',
		header: ({ column }) => <ColumnHeader column={column} title="IFSC Code" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('ifsc_code') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{new Date(row.getValue('created_at')).toLocaleString()}
					</span>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <AccountDataTableRowActions row={row} />,
	},
];
