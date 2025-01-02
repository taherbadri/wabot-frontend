'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
import { columns } from './transactions-columns';
import { TBody } from '@/components/table-body';
import { THeader } from '@/components/table-header';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	fetchTransactions,
	deleteExpense,
} from '@/lib/features/donation/donationManagementSlice';
import { Table } from '@/components/ui/table';
import { toast } from 'sonner';

export default function TransactionsTable() {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState('');
	const dispatch = useAppDispatch();
	const { transactions: data } = useAppSelector(
		(store) => store.donationManagement
	);

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

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
			case 'delete':
				console.log('Deleting expenses:', selectedIds);
				// Implement delete logic here
				break;
			default:
				console.error(`Unsupported bulk action: ${action}`);
				toast.error(`Unsupported bulk action: ${action}`);
		}
	};

	return (
		<div className="overflow-x-auto">
			<TableActions
				table={table}
				handleFilterChange={handleFilterChange}
				handleBulkAction={handleBulkAction}
				bulkActions={[{ label: 'No actions', value: 'no-action' }]}
			/>
			<div className="rounded-md border max-w-[85vw] lg:max-w-full">
				<Table className="w-full">
					<THeader table={table} />
					<TBody table={table} />
				</Table>
			</div>
			<TablePagination table={table} />
		</div>
	);
}
