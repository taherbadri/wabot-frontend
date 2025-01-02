'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { uploadExcel } from '@/lib/features/whatsapp/whatsappSlice';
import { useAppDispatch } from '@/lib/hooks';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.ms-excel',
];

const fileSchema = z
	.any()
	.refine((file) => file instanceof File, 'Please upload a file')
	.refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
	.refine(
		(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
		'Only Excel files are allowed'
	);

const permanentUploadSchema = z.object({
	name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
	file: fileSchema,
});

const uploadSchema = z.object({
	message: z
		.string()
		.min(2, { message: 'Message must be at least 2 characters' }),
	file: fileSchema,
});

const UploadExcelForm = ({ isPermanent }) => {
	const schema = isPermanent ? permanentUploadSchema : uploadSchema;
	const dispatch = useAppDispatch();
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			message: '',
			file: undefined,
		},
	});

	const onSubmit = (data) => {
		console.log('Form data:', data);
		const finalData = isPermanent
			? { ...data, isPermanent }
			: { ...data, isPermanent: false };
		dispatch(uploadExcel(finalData));
		// Handle form submission here
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid md:grid-cols-2 gap-4"
			>
				{isPermanent && (
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="col-span-12">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" {...field} />
								</FormControl>
								<FormDescription>
									This will be the name of the list to send messages to.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name="file"
					render={({ field: { onChange, value, ...rest } }) => (
						<FormItem className="col-span-12">
							<FormLabel>Excel File</FormLabel>
							<FormControl>
								<Input
									type="file"
									accept=".xlsx,.xls"
									onChange={(e) => {
										const file = e.target.files?.[0];
										onChange(file || null);
									}}
									{...rest}
								/>
							</FormControl>
							<FormDescription>
								Excel should contain only{' '}
								<span className="font-bold text-gray-600">one sheet</span> and
								two columns named{' '}
								<span className="font-bold text-gray-600">
									&quot;name&quot;
								</span>{' '}
								and{' '}
								<span className="font-bold text-gray-600">
									&quot;phone_number&quot;
								</span>
								.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{!isPermanent && (
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="col-span-12">
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Type your message here..."
										{...field}
										className="resize-none"
									/>
								</FormControl>
								<FormDescription>
									This will be the message to send to the list.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<div className="flex col-span-12 items-center justify-end">
					<Button type="submit" className="ml-auto">
						Upload
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UploadExcelForm;
