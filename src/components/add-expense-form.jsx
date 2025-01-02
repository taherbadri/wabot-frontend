'use client';
import { addExpenseSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import {
	Select,
	SelectItem,
	SelectValue,
	SelectTrigger,
	SelectContent,
} from './ui/select';
import { Input } from './ui/input';
import {
	updateExpense,
	createExpense,
	fetchAccounts,
	fetchExpenseCategories,
	fetchCurrencies,
} from '@/lib/features/donation/donationManagementSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Textarea } from './ui/textarea';
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export function AddExpenseForm({ children, close, expense }) {
	const [files, setFiles] = useState([]);
	const dispatch = useAppDispatch();
	const { expenseCategories, accounts, currencies } = useAppSelector(
		(store) => store.donationManagement
	);

	const form = useForm({
		resolver: zodResolver(addExpenseSchema),
		defaultValues: {
			item_name: expense?.item_name || '',
			currency: expense?.currency || '',
			exchange_rate: expense?.exchange_rate || '',
			amount: expense?.amount || '',
			expense_date: expense?.expense_date || '',
			category_id: expense?.category_id || '',
			vendor_name: expense?.vendor_name || '',
			account_id: expense?.account_id || '',
			description: expense?.description || '',
			invoice_number: expense?.invoice_number || '',
			bill: [],
		},
	});

	useEffect(() => {
		dispatch(fetchAccounts());
		dispatch(fetchExpenseCategories());
		dispatch(fetchCurrencies());
	}, [dispatch]);

	const onSubmit = async (data) => {
		console.log(`file: add-expense-form.jsx:64 - onSubmit - data:`, data);
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'bill') {
				formData.append(key, value);
			}
		});

		files.forEach((file) => {
			formData.append('bill', file);
		});

		try {
			if (expense?.id) {
				await dispatch(updateExpense({ id: expense.id, formData }));
			} else {
				await dispatch(createExpense(formData));
			}
			close();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 5));
		form.setValue(
			'bill',
			selectedFiles.map((file) => ({ file }))
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid p-2 grid-cols-12 gap-2 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-sidebar-primary-foreground max-h-[80vh]"
			>
				<FormField
					control={form.control}
					name="item_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Item Name</FormLabel>
							<FormControl>
								<Input placeholder="Item Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="currency"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormLabel>Currency</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select currency" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{currencies?.map((currency) => {
										return (
											<SelectItem
												key={currency.id}
												value={currency.currency_code}
											>
												{`${currency.currency_code} - ${currency.currency_name}`}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="exchange_rate"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Exchange Rate</FormLabel>
							<FormControl>
								<Input
									placeholder={(() => {
										const selectedCurrency = currencies.find(
											(c) => c.currency_code === form.getValues('currency')
										);
										return selectedCurrency?.exchange_rate
											? `Previous rate was ${selectedCurrency.exchange_rate}`
											: 'Exchange Rate';
									})()}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input placeholder="Amount" type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="expense_date"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Expense Date</FormLabel>
							<FormControl>
								<Input placeholder="Expense Date" type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category_id"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormLabel>Expense Category</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{expenseCategories?.map((category) => {
										return (
											<SelectItem key={category.id} value={category.id}>
												{category.category_name}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="account_id"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormLabel>Account</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select account" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{accounts?.map((account) => {
										return (
											<SelectItem key={account.id} value={account.id}>
												{account.account_name}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="vendor_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Vendor Name</FormLabel>
							<FormControl>
								<Input placeholder="Vendor Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12 md:col-span-6">
					<FormField
						control={form.control}
						name="bill"
						render={() => (
							<FormItem>
								<FormLabel>Bill Image / PDF</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept={ACCEPTED_FILE_TYPES.join(',')}
										multiple
										onChange={handleFileChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="w-full">
						{files.map((file, index) => (
							<div key={index} className="text-sm">
								{file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
							</div>
						))}
					</div>
				</div>
				<FormField
					control={form.control}
					name="invoice_number"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Invoice Number</FormLabel>
							<FormControl>
								<Input placeholder="Invoice Number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-12">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Description"
									{...field}
									className="resize-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12">{children}</div>
			</form>
		</Form>
	);
}
