'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnHeader } from '@/components/column-header';

import { ExpenseDataTableCellContent } from './details-popover';
import { ExpenseDataTableRowActions } from './row-actions';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

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
		accessorKey: 'item_name',
		header: ({ column }) => <ColumnHeader column={column} title="Item Name" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('item_name') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => <ColumnHeader column={column} title="Category" />,
		cell: ({ row }) => <ExpenseDataTableCellContent expense={row.original} />,
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => <ColumnHeader column={column} title="Amount" />,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-IN', {
				style: 'currency',
				currency: row.original.currency,
			}).format(amount);

			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">{formatted}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'expense_date',
		header: ({ column }) => <ColumnHeader column={column} title="Date" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{new Date(row.getValue('expense_date')).toLocaleDateString()}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'vendor_name',
		header: ({ column }) => <ColumnHeader column={column} title="Vendor" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('vendor_name') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.getValue('description') || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'account',
		header: ({ column }) => <ColumnHeader column={column} title="Accounts" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate">
						{row.original.account?.account_name || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'bill',
		header: ({ column }) => <ColumnHeader column={column} title="Bill" />,
		cell: ({ row }) => {
			const billUrl = row.original.bill;
			const isAbsoluteUrl = /^https?:\/\//i.test(billUrl);
			const url = isAbsoluteUrl
				? billUrl
				: `https://zarya.anymakershub.com/api/${billUrl}`;
			return billUrl ? (
				<Button variant="ghost" size="icon">
					<a href={url} target="_blank" rel="noopener noreferrer">
						<FileText className="h-4 w-4" />
					</a>
				</Button>
			) : (
				'N/A'
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
		cell: ({ row }) => <ExpenseDataTableRowActions row={row} />,
	},
];
