'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnHeader } from '@/components/column-header';
import { ServiceItemActions, ServiceStatusSelect } from './row-actions';
import { ServiceItemCellContent } from './details-popover';

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
		accessorKey: 'description',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => (
			<ServiceItemCellContent
				value={row.getValue('description')}
				details={row.original}
				type="description"
			/>
		),
	},
	{
		accessorKey: 'service_start',
		header: ({ column }) => <ColumnHeader column={column} title="Start Date" />,
		cell: ({ row }) => <div>{row.getValue('service_start')}</div>,
	},
	{
		accessorKey: 'service_end',
		header: ({ column }) => <ColumnHeader column={column} title="End Date" />,
		cell: ({ row }) => <div>{row.getValue('service_end')}</div>,
	},
	{
		accessorKey: 'service_value',
		header: ({ column }) => <ColumnHeader column={column} title="Value" />,
		cell: ({ row }) => <div>{row.getValue('service_value')}</div>,
	},
	{
		accessorKey: 'category.name',
		header: ({ column }) => <ColumnHeader column={column} title="Category" />,
		cell: ({ row }) => {
			const category = row.original.category;
			return (
				<div className="flex items-center">
					<div
						className="w-2 h-2 rounded-full mr-2"
						style={{ backgroundColor: category.color }}
					></div>
					<span>{category.name}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'status.name',
		header: ({ column }) => <ColumnHeader column={column} title="Status" />,
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<div className="flex items-center">
					<div
						className="w-2 h-2 rounded-full mr-2"
						style={{ backgroundColor: status.color }}
					></div>
					<span>{status.name}</span>
				</div>
			);
		},
	},
	{
		id: 'changeStatus',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Change Status" />
		),
		cell: ({ row }) => <ServiceStatusSelect row={row} />,
	},
	{
		accessorKey: 'assign_to',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Assigned To" />
		),
		cell: ({ row }) => {
			const assignTo = row.original.assign_to;
			return (
				<div>
					{assignTo.first_name} {assignTo.last_name}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <ServiceItemActions row={row} />,
	},
];