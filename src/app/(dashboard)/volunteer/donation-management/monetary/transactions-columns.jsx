'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { TransactionDataTableCellContent } from './details-popover';
import { TransactionDataTableRowActions } from './row-actions';

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
		header: 'ID',
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'transaction_type',
		header: 'Type',
		cell: ({ row }) => (
			<TransactionDataTableCellContent transaction={row.original} />
		),
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: row.original?.currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'transaction_direction',
		header: 'Dr / Cr',
		cell: ({ row }) => {
			return <div>{row.getValue('transaction_direction')}</div>;
		},
	},
	{
		accessorKey: 'transaction_date',
		header: 'Date',
		cell: ({ row }) => {
			return (
				<div>
					{new Date(row.getValue('transaction_date')).toLocaleDateString()}
				</div>
			);
		},
	},
	{
		accessorKey: 'account_details.account_name',
		header: 'Account',
		cell: ({ row }) => <div>{row.original?.account_details.account_name}</div>,
	},
	{
		accessorKey: 'reference_details.item_name',
		header: 'Item',
		cell: ({ row }) => (
			<div>{row.original?.reference_details?.item_name || 'N/A'}</div>
		),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => <div>{row.getValue('description') || 'N/A'}</div>,
	},
	{
		accessorKey: 'reference_details.bill',
		header: 'Uploads',
		cell: ({ row }) => {
			const billUrl = row.original?.reference_details?.bill;
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
		header: 'Created At',
		cell: ({ row }) => {
			return <div>{new Date(row.getValue('created_at')).toLocaleString()}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <TransactionDataTableRowActions row={row} />,
	},
];
