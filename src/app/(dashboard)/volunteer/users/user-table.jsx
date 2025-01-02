'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import { TableActions } from '@/components/table-actions';
import { TablePagination } from '@/components/table-pagination';
import { columns } from './columns';
import { TBody } from '@/components/table-body';
import { THeader } from '@/components/table-header';
import { useAppDispatch } from '@/lib/hooks';
import { userActions } from '@/lib/features/user/userSlice';
import { usePathname } from 'next/navigation';
import { Table } from '@/components/ui/table';

export default function UserTable({ data }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState('');
	const dispatch = useAppDispatch();
	const pathName = usePathname();
	const userTypeToFetch = pathName.split('/').includes('users') ? '' : 'users';

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	const debouncedSetGlobalFilter = useMemo(
		() =>
			debounce((value) => {
				console.log('Filtering with value:', value);
				setGlobalFilter(value);
			}, 300),
		[]
	);

	const handleFilterChange = useCallback(
		(event) => {
			debouncedSetGlobalFilter(event.target.value);
		},
		[debouncedSetGlobalFilter]
	);

	const handleBulkAction = (action) => {
		const selectedRows = table.getFilteredSelectedRowModel().rows;
		const selectedIds = selectedRows.map((row) => row.original.id);
		console.log(`Bulk action: ${action}`, selectedIds);
		// Implement user-specific bulk actions here
		switch (action) {
			case 'activate':
				console.log('Activating users:', selectedIds);
				dispatch(
					userActions({
						action: 'update-status',
						details: selectedIds,
						actionId: 'activate',
						filter: userTypeToFetch,
					})
				);
				break;
			case 'deactivate':
				console.log('Deactivating users:', selectedIds);
				dispatch(
					userActions({
						action: 'update-status',
						details: selectedIds,
						actionId: 'deactivate',
						filter: userTypeToFetch,
					})
				);
				break;
			case 'delete':
				console.log('Deleting users:', selectedIds);
				dispatch(
					userActions({ action, details: selectedIds, filter: userTypeToFetch })
				);
				break;
			default:
				console.log('Unknown action:', action);
		}
	};

	return (
		<div className="overflow-x-auto">
			<TableActions
				table={table}
				handleFilterChange={handleFilterChange}
				handleBulkAction={handleBulkAction}
				bulkActions={[
					{ label: 'Activate', value: 'activate' },
					{ label: 'Deactivate', value: 'deactivate' },
					{ label: 'Delete', value: 'delete' },
				]}
			/>
			<div className="rounded-md border max-w-[85vw] lg:max-w-full">
				<Table>
					<THeader table={table} />
					<TBody table={table} />
				</Table>
			</div>
			<TablePagination table={table} />
		</div>
	);
}
