import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export function TBody({ table }) {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						colSpan={table.getAllColumns().length}
						className="h-24 text-center"
					>
						No results.
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
}
