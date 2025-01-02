'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { assignMonetaryDonationSchema } from '@/lib/schemas';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	fetchAccounts,
	fetchCurrencies,
} from '@/lib/features/donation/donationManagementSlice';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { assignDonation } from '@/lib/features/donation/donationSlice';
import { useEffect } from 'react';
import { z } from 'zod';
import {
	fetchMaterialisticList,
	fetchServiceList,
} from '../lib/features/donation/donationManagementSlice';

const materialRequestSchema = z.object({
	delivery_date: z.string().min(1, { message: 'Delivery Date is required' }),
	material_ids: z.array(z.string()).min(1, { message: 'Material is required' }),
});
const serviceRequestSchema = z.object({
	delivery_date: z.string().min(1, { message: 'Delivery Date is required' }),
	service_ids: z.array(z.string()).min(1, { message: 'Service is required' }),
});

export function AssignDonationDialog({
	isOpen,
	onClose,
	donationType,
	requestId,
}) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Assign{' '}
						{donationType?.charAt(0).toUpperCase() + donationType?.slice(1)}{' '}
						Donation
					</DialogTitle>
				</DialogHeader>
				{donationType === 'Monetary' ? (
					<AssignMonetaryDonationForm
						id={requestId}
						type={donationType}
						onClose={onClose}
					>
						<DialogFooter className="mt-4">
							<Button type="submit">Assign Donation</Button>
						</DialogFooter>
					</AssignMonetaryDonationForm>
				) : donationType === 'Materialistic' ? (
					<MaterialRequestForm
						id={requestId}
						type={donationType}
						onClose={onClose}
					>
						<DialogFooter className="mt-4">
							<Button type="submit">Assign Donation</Button>
						</DialogFooter>
					</MaterialRequestForm>
				) : (
					<ServiceRequestForm
						id={requestId}
						type={donationType}
						onClose={onClose}
					>
						<DialogFooter className="mt-4">
							<Button type="submit">Assign Donation</Button>
						</DialogFooter>
					</ServiceRequestForm>
				)}
			</DialogContent>
		</Dialog>
	);
}

export const AssignMonetaryDonationForm = ({ children, id, type, onClose }) => {
	const form = useForm({
		resolver: zodResolver(assignMonetaryDonationSchema),
		defaultValues: {
			account_id: '',
			currency: '',
			exchange_rate: '',
			amount: '',
			transaction_date: '',
			description: '',
			bank_name: '',
			account_number: '',
			ifsc_code: '',
		},
	});
	const dispatch = useAppDispatch();
	const { accounts, currencies } = useAppSelector(
		(store) => store.donationManagement
	);
	useEffect(() => {
		dispatch(fetchAccounts());
		dispatch(fetchCurrencies());
	}, [dispatch]);

	const onSubmit = (data) => {
		console.log(`file: assign-donation-dialog.jsx:75 - onSubmit - data:`, data);
		dispatch(assignDonation({ ...data, id, type }));
		onClose();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid p-2 grid-cols-12 gap-2 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-sidebar-primary-foreground max-h-[80vh]"
			>
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
					name="transaction_date"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Transaction Date</FormLabel>
							<FormControl>
								<Input placeholder="Transaction Date" type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bank_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Bank Name</FormLabel>
							<FormControl>
								<Input placeholder="Bank Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input placeholder="Account Number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ifsc_code"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>IFSC Code</FormLabel>
							<FormControl>
								<Input placeholder="IFSC Code" {...field} />
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
};

const ServiceRequestForm = ({ children, id, type, onClose }) => {
	const form = useForm({
		resolver: zodResolver(serviceRequestSchema),
		defaultValues: {
			delivery_date: '',
			service_ids: [],
		},
	});

	const dispatch = useAppDispatch();
	const { serviceList } = useAppSelector((store) => store.donationManagement);

	useEffect(() => {
		dispatch(fetchServiceList());
	}, [dispatch]);

	const onSubmit = (data) => {
		console.log(
			`file: assign-donation-dialog.jsx:140 - onSubmit - data:`,
			data
		);
		dispatch(assignDonation({ ...data, id, type }));
		onClose();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="max-h-52.overflow-y-auto">
					<FormField
						control={form.control}
						name="service_ids"
						render={() => (
							<FormItem>
								<div className="mb-1">
									<FormLabel className="text-base">Select Services</FormLabel>
									<FormDescription>
										Select the services you want to assign.
									</FormDescription>
								</div>
								{serviceList?.map((item) => (
									<FormField
										key={item.id}
										control={form.control}
										name="service_ids"
										render={({ field }) => {
											return (
												item.status.name === 'Available' && (
													<FormItem
														key={item.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(item.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...field.value, item.id])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== item.id
																				)
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className="text-sm font-normal">
															{item.description}
														</FormLabel>
													</FormItem>
												)
											);
										}}
									/>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="delivery_date"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Delivery Date</FormLabel>
							<FormControl>
								<Input placeholder="Delivery Date" type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12">{children}</div>
			</form>
		</Form>
	);
};

const MaterialRequestForm = ({ children, id, type, onClose }) => {
	const form = useForm({
		resolver: zodResolver(materialRequestSchema),
		defaultValues: {
			delivery_date: '',
			material_ids: [],
		},
	});

	const dispatch = useAppDispatch();
	const { materialisticList } = useAppSelector(
		(store) => store.donationManagement
	);

	useEffect(() => {
		dispatch(fetchMaterialisticList());
	}, [dispatch]);

	const onSubmit = (data) => {
		console.log(
			`file: assign-donation-dialog.jsx:425 - onSubmit - data:`,
			data
		);
		dispatch(assignDonation({ ...data, id, type }));
		onClose();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="max-h-52 overflow-y-auto">
					<FormField
						control={form.control}
						name="material_ids"
						render={() => (
							<FormItem>
								<div className="mb-1">
									<FormLabel className="text-base">Select Materials</FormLabel>
									<FormDescription>
										Select the materials you want to assign.
									</FormDescription>
								</div>
								{materialisticList?.map((item) => (
									<FormField
										key={item.id}
										control={form.control}
										name="material_ids"
										render={({ field }) => {
											return (
												item.status.name === 'Available' && (
													<FormItem
														key={item.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(item.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...field.value, item.id])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== item.id
																				)
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className="text-sm font-normal">
															{item.item_name}
														</FormLabel>
													</FormItem>
												)
											);
										}}
									/>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="delivery_date"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Delivery Date</FormLabel>
							<FormControl>
								<Input placeholder="Delivery Date" type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12">{children}</div>
			</form>
		</Form>
	);
};
