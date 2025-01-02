'use client';
import React from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestDonationFormSchema } from '@/lib/schemas';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Button } from './ui/button';

const RequestDonationForm = () => {
	const form = useForm({
		resolver: zodResolver(requestDonationFormSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			address: '',
			contact_number: '',
			city: '',
			pincode: '',
			state: '',
			country: '',
			description: '',
			category: '',
			assign_to: '',
			status: '',
		},
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid grid-cols-12 gap-2"
			>
				<FormField
					control={form.control}
					name="first_name"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="contact_number"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input {...field} type="number" />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="city"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="state"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="pincode"
					render={(field) => {
						return (
							<FormItem className="col-span-12 md:col-span-6">
								<FormLabel>Pincode</FormLabel>
								<FormControl>
									<Input {...field} type="number" />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="address"
					render={(field) => {
						return (
							<FormItem className="col-span-12">
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Textarea {...field} className="resize-none" />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="category"
					render={(field) => {
						return (
							<FormItem className="col-span-12">
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Donation Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Monetary">Monetary</SelectItem>
										<SelectItem value="Materialistic">Materialistic</SelectItem>
										<SelectItem value="Service">Service</SelectItem>
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
					render={(field) => {
						return (
							<FormItem className="col-span-12">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea {...field} className="resize-none" />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button type="submit" className="col-span-4">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default RequestDonationForm;
