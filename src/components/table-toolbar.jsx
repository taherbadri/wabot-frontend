import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross } from "lucide-react";
import { DataTableViewOptions } from "./table-view-options";
import { DataTableFacetedFilter } from "./table-filter";

const categories = [
	{ id: "1", name: "Clothing" },
	{ id: "2", name: "Food" },
	{ id: "3", name: "Medical Assistance" },
	{ id: "4", name: "Educational Supplies" },
	{ id: "5", name: "Other" },
];

const statuses = [
	{ id: "1", name: "Pending" },
	{ id: "2", name: "Approved" },
	{ id: "3", name: "Rejected" },
	{ id: "4", name: "Completed" },
];

export function DataTableToolbar({ table }) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter donations..."
					value={table.getColumn("id")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("id")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)}
				{table.getColumn("category") && (
					<DataTableFacetedFilter
						column={table.getColumn("category")}
						title="Category"
						options={categories}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
