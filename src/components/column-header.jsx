import { ArrowUpDown, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ColumnHeader({ column, title }) {
	if (!column.getCanSort()) {
		return <div className="text-left">{title}</div>;
	}

	return (
		<div className="flex items-center space-x-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem
						onClick={() => {
							column.toggleSorting(false);
							console.log("Sorting changed:", title, "ASC");
						}}
					>
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							column.toggleSorting(true);
							console.log("Sorting changed:", title, "DESC");
						}}
					>
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							column.toggleVisibility(false);
							console.log("Column hidden:", title);
						}}
					>
						<EyeOff className="mr-2 h-4 w-4" />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
