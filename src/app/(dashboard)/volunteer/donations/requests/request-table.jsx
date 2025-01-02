'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { TableActions } from '@/components/table-actions';
import { TablePagination } from '@/components/table-pagination';
import { createColumns } from './columns';
import debounce from 'lodash.debounce';
import { TBody } from '@/components/table-body';
import { THeader } from '@/components/table-header';
import { useAppDispatch } from '@/lib/hooks';
import { donationAction } from '@/lib/features/donation/donationSlice';
import { Table } from '@/components/ui/table';

export default function RequestTable({ data }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState('');
	const dispatch = useAppDispatch();

	const columns = useMemo(() => createColumns(dispatch), [dispatch]);

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
		dispatch(donationAction({ action, details: selectedIds }));
	};

	return (
		<div className="overflow-x-auto">
			<TableActions
				table={table}
				handleFilterChange={handleFilterChange}
				handleBulkAction={handleBulkAction}
				bulkActions={[
					{ label: 'Freeze', value: 'freeze' },
					{ label: 'Reject', value: 'reject' },
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
