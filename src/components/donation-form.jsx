'use client';
import { Loader, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from './ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	inputOtpSchema,
	verifyPhoneNumberSchema,
	monetaryDonationSchema,
	personalDetailsSchema,
	materialisticDonationSchema,
	serviceDonationSchema,
	requestDonationSchema,
} from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	incrementStep,
	decrementStep,
	resendOtp,
	verifyPhoneNumber,
	verifyOtp,
	setPhoneNumber,
	fetchCategories,
	submitDonationDetails,
	submitMaterialisticDonationDetails,
	submitPersonalDetails,
	submitRequestDetails,
} from '@/lib/features/donation/donateSlice';

import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/features/user/userSlice';

function RequestDonationForm() {
	const dispatch = useAppDispatch();
	const { categories, contact_number, isLoading } = useAppSelector(
		(store) => store.donate
	);
	const form = useForm({
		resolver: zodResolver(requestDonationSchema),
		defaultValues: {
			category_id: '',
			description: '',
		},
	});

	useEffect(() => {
		dispatch(fetchCategories('request'));
	}, [dispatch]);

	const onSubmit = (data) => {
		dispatch(submitRequestDetails({ ...data, contact_number }));
	};

	return (
		<Form {...form}>
			<form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="category_id"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((category) => (
											<SelectItem value={category.id} key={category.id}>
												{category.category_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
							<FormItem className="w-full">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										className="resize-none"
										{...field}
										placeholder="Description"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

function MonetaryDonationForm() {
	const form = useForm({
		resolver: zodResolver(monetaryDonationSchema),
		defaultValues: {
			amount: '',
			payment_method: '',
			category_id: '',
		},
	});
	const dispatch = useAppDispatch();
	const { contact_number, categories, isLoading } = useAppSelector(
		(store) => store.donate
	);

	useEffect(() => {
		dispatch(fetchCategories('monetary_item'));
	}, [dispatch]);

	const onSubmit = (data) => {
		dispatch(
			submitDonationDetails({
				...data,
				contact_number,
				donation_type: 'Monetary',
			})
		);
	};

	return (
		<Form {...form}>
			<form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="category_id"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((category) => (
											<SelectItem value={category.id} key={category.id}>
												{category.category_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="payment_method"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormLabel>Method</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a payment method" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Online">Online</SelectItem>
										<SelectItem value="Cash">Cash</SelectItem>
										<SelectItem value="Cheque">Cheque</SelectItem>
										<SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input type="number" {...field} placeholder="Amount" />
								</FormControl>
								<FormDescription>
									Enter the amount you want to donate
								</FormDescription>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

function MaterialisticDonationForm() {
	const [files, setFiles] = useState([]);

	const form = useForm({
		resolver: zodResolver(materialisticDonationSchema),
		defaultValues: {
			category_id: '',
			item_name: '',
			description: '',
			pickup_address: '',
			alternate_phone: '',
			availability_start: '',
			availability_end: '',
			images: [],
		},
	});
	const dispatch = useAppDispatch();
	const { contact_number, categories, isLoading } = useAppSelector(
		(store) => store.donate
	);
	const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

	useEffect(() => {
		dispatch(fetchCategories('material_item'));
	}, [dispatch]);

	const onSubmit = async (data) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'images') {
				formData.append(key, value);
			}
		});

		files.forEach((file) => {
			formData.append('images[]', file);
		});

		formData.append('contact_number', contact_number);
		formData.append('donation_type', 'Materialistic');

		try {
			dispatch(submitMaterialisticDonationDetails(formData));
		} catch (error) {
			console.error(error);
		}
	};

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 5));
		form.setValue(
			'images',
			selectedFiles.map((file) => ({ file }))
		);
	};

	return (
		<Form {...form}>
			<form
				className="grid grid-cols-12 gap-2"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="category_id"
					render={({ field }) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((category) => (
											<SelectItem value={category.id} key={category.id}>
												{category.category_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="item_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Item Name</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="alternate_phone"
					render={({ field }) => (
						<FormItem className="col-span-12 ">
							<FormLabel>Alternate Phone Number</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-12 ">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} className="resize-none" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pickup_address"
					render={({ field }) => (
						<FormItem className="col-span-12 ">
							<FormLabel>Pickup Address</FormLabel>
							<FormControl>
								<Textarea {...field} className="resize-none" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="availability_start"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Availability Start</FormLabel>
							<FormControl>
								<Input type="date" {...field} className="w-full" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="availability_end"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Availability End</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12">
					<FormField
						control={form.control}
						name="images"
						render={() => (
							<FormItem>
								<FormLabel>Item Images</FormLabel>
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
				<Button className="col-span-12" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

function ServiceDonationForm() {
	const form = useForm({
		resolver: zodResolver(serviceDonationSchema),
		defaultValues: {
			category_id: '',
			description: '',
			service_start: '',
			service_end: '',
			service_value: '',
		},
	});
	const dispatch = useAppDispatch();
	const { contact_number, categories, isLoading } = useAppSelector(
		(store) => store.donate
	);
	useEffect(() => {
		dispatch(fetchCategories('service_item'));
	}, [dispatch]);

	const onSubmit = (data) => {
		dispatch(
			submitDonationDetails({
				...data,
				contact_number,
				donation_type: 'Service',
			})
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-12 gap-2"
			>
				<FormField
					control={form.control}
					name="category_id"
					render={({ field }) => {
						return (
							<FormItem className="col-span-12">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((category) => (
											<SelectItem value={category.id} key={category.id}>
												{category.category_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-12 ">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} className="resize-none" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="service_start"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Service Start</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="service_end"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Service End</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="service_value"
					render={({ field }) => (
						<FormItem className="col-span-12 ">
							<FormLabel>Service Value</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="col-span-12" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

export function SelectDonationTypeForm() {
	return (
		<Tabs defaultValue="monetary" className="w-full">
			<TabsList className="w-full md:max-w-sm">
				<TabsTrigger value="monetary" className="w-full">
					Monetary
				</TabsTrigger>
				<TabsTrigger value="materialistic" className="w-full">
					Materialistic
				</TabsTrigger>
				<TabsTrigger value="service" className="w-full">
					Service
				</TabsTrigger>
			</TabsList>
			<TabsContent value="monetary">
				<MonetaryDonationForm />
			</TabsContent>
			<TabsContent value="materialistic">
				<MaterialisticDonationForm />
			</TabsContent>
			<TabsContent value="service">
				<ServiceDonationForm />
			</TabsContent>
		</Tabs>
	);
}

export function EnterPersonalDetailsForm({ isVolunteer }) {
	const [showPassword, setShowPassword] = useState(false);
	const { contact_number, isLoading } = useAppSelector((store) => store.donate);
	const dispatch = useAppDispatch();

	const form = useForm({
		resolver: zodResolver(personalDetailsSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			city: '',
			pincode: '',
			state: '',
			country: '',
			password: '',
			confirm_password: '',
		},
	});

	const onSubmit = (data) => {
		if (isVolunteer) {
			dispatch(createUser(data));
		} else {
			dispatch(submitPersonalDetails({ ...data, contact_number }));
		}
	};

	return (
		<Form {...form}>
			<form
				className="grid md:grid-cols-12 gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="First Name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Last Name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem
							className={`${
								isVolunteer ? 'col-span-12 md:col-span-6' : 'col-span-12'
							}`}
						>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} placeholder="Email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isVolunteer && (
					<FormField
						control={form.control}
						name="contact_number"
						render={({ field }) => (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input type="number" {...field} placeholder="Phone Number" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem className="col-span-12">
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Address"
									className="resize-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} placeholder="City" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pincode"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Pincode</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Pincode" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} placeholder="State" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Country" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative w-full">
										<Input
											{...field}
											placeholder="Password"
											type={showPassword ? 'text' : 'password'}
										/>
										<Button
											type="button"
											variant="icon"
											onClick={() => setShowPassword((prev) => !prev)}
											className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
										>
											{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									{...field}
									placeholder="Confirm Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="col-span-12" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

function VerifyOTPForm() {
	const { contact_number, isLoading } = useAppSelector((store) => store.donate);
	const form = useForm({
		resolver: zodResolver(inputOtpSchema),
		defaultValues: {
			otp: '',
		},
	});
	const dispatch = useAppDispatch();
	const onSubmit = (data) => {
		dispatch(verifyOtp({ ...data, contact_number }));
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 grid place-items-center"
			>
				<FormField
					className="w-full"
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem className="max-w-xs">
							<FormDescription>
								Please enter the one-time password sent to your phone.
							</FormDescription>
							<FormControl>
								<div className="flex flex-col">
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>

									<div className="flex justify-end items-center gap-1 text-sm">
										Didn&apos;t receive OTP?
										<Button
											variant="link"
											className="justify-items-end p-0"
											onClick={() => {
												dispatch(resendOtp({ contact_number }));
											}}
										>
											Resend
										</Button>
									</div>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" /> Verifying...
						</>
					) : (
						'Verify'
					)}
				</Button>
			</form>
		</Form>
	);
}

function VerifyPhoneNumberForm() {
	const { isLoading } = useAppSelector((store) => store.donate);
	const form = useForm({
		resolver: zodResolver(verifyPhoneNumberSchema),
		defaultValues: {
			contact_number: '',
		},
	});
	const dispatch = useAppDispatch();
	const onSubmit = (data) => {
		dispatch(verifyPhoneNumber(data));
		dispatch(setPhoneNumber(data.contact_number));
		// dispatch(incrementStep());
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 grid place-items-center"
			>
				<FormField
					control={form.control}
					name="contact_number"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormControl>
									<Input {...field} placeholder="Phone Number" />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader className="animate-spin" />
							Requesting OTP...
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}

export default function DonationForm({ isRequest }) {
	const { steps, totalSteps } = useAppSelector((store) => store.donate);
	const stepName = {
		1: 'Verify Phone Number',
		2: 'Enter One Time Password',
		3: 'Enter Personal Details',
		4: 'Enter Preferred Donation Details',
	};

	const stepForm = {
		1: <VerifyPhoneNumberForm />,
		2: <VerifyOTPForm />,
		3: <EnterPersonalDetailsForm />,
		4: isRequest ? <RequestDonationForm /> : <SelectDonationTypeForm />,
	};
	return (
		<>
			{steps === totalSteps && isRequest ? (
				<RequestSubmitted />
			) : steps === totalSteps ? (
				<ThankYouCard />
			) : (
				<Card className="mx-auto max-w-md w-full min-h-full my-4 md:my-0">
					<CardHeader>
						<CardTitle className="text-2xl">
							{isRequest ? 'Request Donation Form' : 'Donation Form'}
						</CardTitle>
						<Progress value={(steps * 100) / totalSteps} />
						<CardDescription className="text-black text-lg">
							{stepName[steps]}
						</CardDescription>
					</CardHeader>
					<CardContent>{stepForm[steps]}</CardContent>
				</Card>
			)}
		</>
	);
}

function ThankYouCard() {
	return (
		<Card className="mx-auto max-w-md w-full min-h-full my-4 md:my-0">
			<CardHeader>
				<CardTitle className="text-2xl">Thank You</CardTitle>
				<CardDescription className="text-black text-lg">
					We appreciate your donation and we will review it as soon as possible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button asChild>
					<Link href="/login">Back to Login</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
function RequestSubmitted() {
	return (
		<Card className="mx-auto max-w-md w-full min-h-full my-4 md:my-0">
			<CardHeader>
				<CardTitle className="text-2xl">Request Received</CardTitle>
				<CardDescription className="text-black text-lg">
					We have received your request.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button asChild>
					<Link href="/login">Back to Login</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
