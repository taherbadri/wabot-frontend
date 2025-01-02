'use client';
import { createUser } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { userRegistrationSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

export function UserRegistrationForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { user } = useAppSelector((store) => store.authentication);
	const dispatch = useAppDispatch();

	const form = useForm({
		resolver: zodResolver(userRegistrationSchema),
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
			isAdmin: false,
			confirm_password: '',
			contact_number: '',
		},
	});

	const onSubmit = (data) => {
		console.log({ ...data });

		dispatch(createUser(data));
	};

	return (
		<Form {...form}>
			<form
				className="grid md:grid-cols-12 gap-2"
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
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} placeholder="Email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
											autoComplete="new-password"
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
									autoComplete="new-password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{user?.user_type === 'super-admin' && (
					<FormField
						control={form.control}
						name="is_admin"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow col-span-12">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Register as Admin</FormLabel>
									<FormDescription>
										Check this box only if you want the user to be registered as
										Admin{' '}
									</FormDescription>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<Button className="col-span-12 md:col-span-4" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
