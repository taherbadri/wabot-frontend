"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function TableActions({
	table,
	handleFilterChange,
	handleBulkAction,
	bulkActions,
}) {
	const [selectedAction, setSelectedAction] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleActionSelect = (action) => {
		setSelectedAction(action);
		setIsDialogOpen(true);
	};

	const handleConfirm = () => {
		if (selectedAction) {
			handleBulkAction(selectedAction.value);
			setIsDialogOpen(false);
			setSelectedAction(null);
		}
	};

	return (
		<div className="flex flex-col md:flex-row gap-2 items-center justify-between py-4">
			<Input
				placeholder="Filter data"
				onChange={handleFilterChange}
				className="w-full md:max-w-sm"
			/>
			<div className="flex w-full md:max-w-xs items-center justify-between md:justify-end gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{bulkActions.map((action) => (
							<DropdownMenuItem
								key={action.value}
								onSelect={() => handleActionSelect(action)}
							>
								{action.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm {selectedAction?.label}</DialogTitle>
							<DialogDescription>
								Are you sure you want to {selectedAction?.label.toLowerCase()}?
								This action cannot be undone.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleConfirm}>Confirm</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
