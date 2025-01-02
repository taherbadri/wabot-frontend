'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddAccountForm } from '@/components/add-account-form';
import { AddExpenseForm } from '@/components/add-expense-form';
import { Plus } from 'lucide-react';
import AccountsTable from './accounts-table';
import ExpensesTable from './expenses-table';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import TransactionsTable from './transactions-table';

export default function MonetaryDonationManagementPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	return (
		<div className="flex flex-col w-full h-full">
			<Tabs defaultValue="account" className="w-full">
				<TabsList className="flex flex-col h-auto w-full gap-2 md:flex-row md:max-w-md">
					<TabsTrigger value="transactions" className="w-full">
						Transactions
					</TabsTrigger>
					<TabsTrigger value="account" className="w-full">
						Account Management
					</TabsTrigger>
					<TabsTrigger value="expense" className="w-full">
						Expense Management
					</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<Card className="w-full shadow-none border-none">
						<CardHeader>
							<CardTitle className="text-xl md:text-2xl flex items-center justify-between">
								Account Management
								<Button
									variant={'secondary'}
									onClick={() => setIsDialogOpen(true)}
								>
									Add
									<Plus />
								</Button>
							</CardTitle>

							<Separator />
						</CardHeader>
						<CardContent className="overflow-hidden">
							<AccountsTable />
						</CardContent>
					</Card>
					<CompleteDialog
						isOpen={isDialogOpen}
						onClose={() => setIsDialogOpen(false)}
						type={'accounts'}
					/>
				</TabsContent>
				<TabsContent value="expense">
					<Card className="w-full shadow-none border-none">
						<CardHeader>
							<CardTitle className="text-xl md:text-2xl flex items-center justify-between">
								Expense Management
								<Button
									variant={'secondary'}
									onClick={() => setIsDialogOpen(true)}
								>
									Add
									<Plus />
								</Button>
							</CardTitle>

							<Separator />
						</CardHeader>
						<CardContent>
							<ExpensesTable />
						</CardContent>
					</Card>
					<CompleteDialog
						isOpen={isDialogOpen}
						onClose={() => setIsDialogOpen(false)}
						type={'expense'}
					/>
				</TabsContent>
				<TabsContent value="transactions">
					<Card className="w-full shadow-none border-none">
						<CardHeader>
							<CardTitle className="text-xl md:text-2xl">
								Transactions
							</CardTitle>
							<Separator />
						</CardHeader>
						<CardContent>
							<TransactionsTable />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export function CompleteDialog({ isOpen, onClose, type }) {
	const dispatch = useAppDispatch();
	const [isCompleting, setIsCompleting] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			{type === 'accounts' ? (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Account</DialogTitle>
						<DialogDescription>Enter account details below</DialogDescription>
					</DialogHeader>
					<AddAccountForm close={onClose}>
						<DialogFooter className="gap-2">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button disabled={isCompleting}>Add</Button>
						</DialogFooter>
					</AddAccountForm>
				</DialogContent>
			) : (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Expense</DialogTitle>
						<DialogDescription>Enter expense details below</DialogDescription>
					</DialogHeader>
					<AddExpenseForm close={onClose}>
						<DialogFooter className="gap-2">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button disabled={isCompleting}>Add</Button>
						</DialogFooter>
					</AddExpenseForm>
				</DialogContent>
			)}
		</Dialog>
	);
}
