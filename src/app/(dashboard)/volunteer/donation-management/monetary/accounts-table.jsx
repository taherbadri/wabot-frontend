"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { TableActions } from "@/components/table-actions";
import { TablePagination } from "@/components/table-pagination";
import { columns } from "./columns";
import { TBody } from "@/components/table-body";
import { THeader } from "@/components/table-header";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userActions } from "@/lib/features/user/userSlice";
import { fetchAccounts } from "@/lib/features/donation/donationManagementSlice";
import {
	deleteAccount,
	updateAccount,
} from "@/lib/features/donation/donationManagementSlice";
import { Table } from "@/components/ui/table";
export default function AccountsTable() {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState("");
	const dispatch = useAppDispatch();
	const { accounts: data } = useAppSelector(
		(store) => store.donationManagement
	);

	useEffect(() => {
		dispatch(fetchAccounts());
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
				console.log("Filtering with value:", value);
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
			case "delete":
				console.log("Deleting accounts:", selectedIds);
				dispatch(deleteAccount(selectedIds));
				// Implement delete logic here
				break;
			default:
				console.error(`Unsupported bulk action: ${action}`);
		}
	};

	return (
		<div className="container">
			<TableActions
				table={table}
				handleFilterChange={handleFilterChange}
				handleBulkAction={handleBulkAction}
				bulkActions={[
					{ label: "Update", value: "update" },
					{ label: "Delete", value: "delete" },
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