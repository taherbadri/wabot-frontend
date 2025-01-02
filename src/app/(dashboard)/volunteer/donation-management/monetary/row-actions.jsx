'use client';

import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/lib/hooks';
import { toast } from 'sonner';
import {
	deleteAccount,
	deleteExpense,
} from '@/lib/features/donation/donationManagementSlice';

import { AddAccountForm } from '@/components/add-account-form';
import { AddExpenseForm } from '@/components/add-expense-form';

export function AccountDataTableRowActions({ row }) {
	const dispatch = useAppDispatch();
	const account = row.original;

	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		console.log('Deleting account:', account.id);
		dispatch(deleteAccount([account.id]));

		setIsDeleteDialogOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
						<Pencil className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update Account</DialogTitle>
						<DialogDescription>
							Are you sure you want to update the account &quot;
							{account.account_name}&quot;?
						</DialogDescription>
					</DialogHeader>
					<AddAccountForm
						account={account}
						close={() => setIsUpdateDialogOpen(false)}
					>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsUpdateDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button>Update</Button>
						</DialogFooter>
					</AddAccountForm>
				</DialogContent>
			</Dialog>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Account</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete the account &quot;
							{account.account_name}&quot;? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export function ExpenseDataTableRowActions({ row }) {
	const dispatch = useAppDispatch();
	const expense = row.original;

	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		console.log('Deleting expense:', expense.id);
		dispatch(deleteExpense([expense.id]));

		setIsDeleteDialogOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
						<Pencil className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update Expense</DialogTitle>
						<DialogDescription>
							Are you sure you want to update the expense &quot;
							{expense.item_name}&quot;?
						</DialogDescription>
					</DialogHeader>
					<AddExpenseForm
						expense={expense}
						close={() => setIsUpdateDialogOpen(false)}
					>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsUpdateDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button>Update</Button>
						</DialogFooter>
					</AddExpenseForm>
				</DialogContent>
			</Dialog>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Account</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete the expense &quot;
							{expense.item_name}&quot;? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export function TransactionDataTableRowActions({ row }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(row.original.id)}
				>
					Copy transaction ID
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{/* <DropdownMenuItem>View details</DropdownMenuItem>
				<DropdownMenuItem>Edit transaction</DropdownMenuItem>
				<DropdownMenuItem>Delete transaction</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
