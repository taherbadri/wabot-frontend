'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchAccounts } from '@/lib/features/donation/donationManagementSlice';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { donationAction } from '@/lib/features/donation/donationSlice';
import { useForm } from 'react-hook-form';
import { monetaryDonationCompletionFormSchema } from '@/lib/schemas/donationFormSchema';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function DataTableRowActions({ row }) {
	const dispatch = useAppDispatch();
	const donation = row.original;
	const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

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
					<DropdownMenuItem asChild>
						<Button variant="ghost" asChild className="text-left">
							<Link
								href={`/volunteer/donations/requests/details?id=${donation.id}`}
							>
								View
							</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					{donation.status.name !== 'Completed' && (
						<>
							{donation.donation_type === 'Monetary' ? (
								<DropdownMenuItem onClick={() => setIsCompleteDialogOpen(true)}>
									Complete
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									onClick={
										() => console.log('Complete', donation.id)
										// dispatch(
										// 	donationAction({
										// 		action: 'complete',
										// 		details: donation.id,
										// 	})
										// )
									}
								>
									Complete
								</DropdownMenuItem>
							)}
							<DropdownMenuItem
								onClick={() => {
									console.log('Freeze donation:', donation.id);
									// dispatch(
									// 	donationAction({ action: 'freeze', details: [donation.id] })
									// );
								}}
							>
								Freeze
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									console.log('Reject donation:', donation.id);
									// dispatch(
									// 	donationAction({ action: 'reject', details: [donation.id] })
									// );
								}}
							>
								Reject
							</DropdownMenuItem>
						</>
					)}
					<DropdownMenuItem
						onClick={() => {
							console.log('Delete donation:', donation.id);
							// dispatch(
							// 	donationAction({ action: 'delete', details: [donation.id] })
							// );
						}}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<CompleteDialog
				isOpen={isCompleteDialogOpen && donation.donation_type === 'Monetary'}
				onClose={() => setIsCompleteDialogOpen(false)}
				donationId={donation.id}
				donationType={donation.donation_type}
			/>
		</>
	);
}

export function CompleteDialog({ isOpen, onClose, donationId }) {
	const { accounts } = useAppSelector((store) => store.donationManagement);
	const form = useForm({
		resolver: zodResolver(monetaryDonationCompletionFormSchema),
		defaultValues: {
			account_id: '',
			transaction_date: '',
			description: '',
		},
	});
	const dispatch = useAppDispatch();
	const [isCompleting, setIsCompleting] = useState(false);

	const fetchAllAccounts = useCallback(() => {
		console.log('first');
		dispatch(fetchAccounts());
	}, [dispatch]);

	useEffect(() => {
		if (isOpen) fetchAllAccounts();
	}, [fetchAllAccounts, isOpen]);

	const handleComplete = async (data) => {
		setIsCompleting(true);
		try {
			console.log(`file: row-actions.jsx:160 - handleComplete - data:`, {
				action: 'complete',
				details: donationId,
				completionData: data,
			});
			// await dispatch(
			// 	donationAction({
			// action: 'complete',
			// details: donationId,
			// completionData: data,
			// 	})
			// );
			onClose();
		} catch (error) {
			onClose();
			console.error('Error completing donation', error);
		} finally {
			setIsCompleting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Complete Donation</DialogTitle>
					<DialogDescription>
						Are you sure you want to mark this donation as complete?
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="grid grid-cols-12 gap-4"
						onSubmit={form.handleSubmit(handleComplete)}
					>
						<FormField
							control={form.control}
							name="account_id"
							render={({ field }) => {
								return (
									<FormItem className="col-span-12 md:col-span-6">
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormLabel>Account</FormLabel>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a payment method" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{accounts?.map((account) => {
													return (
														<SelectItem key={account.id} value={account.id}>
															{account.account_name} ({account.account_type})
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="transaction_date"
							render={({ field }) => {
								return (
									<FormItem className="col-span-12 md:col-span-6">
										<FormLabel>Transaction Date</FormLabel>
										<FormControl>
											<Input type="date" {...field} placeholder="Amount" />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem className="col-span-12">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Description"
												className="resize-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<DialogFooter className="col-span-12">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button onClick={handleComplete} disabled={isCompleting}>
								{isCompleting ? 'Completing...' : 'Complete'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
