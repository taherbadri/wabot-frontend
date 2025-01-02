'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/lib/schemas';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	loginUser,
	setPhoneNumber,
} from '@/lib/features/authentication/authenticationSlice';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			contact_number: '',
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	const dispatch = useAppDispatch();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your phone number and email below to sign up
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="contact_number"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<Input {...field} placeholder="Phone Number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<Input {...field} placeholder="Email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password"
							type="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder="Password"
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="confirm_password"
							type="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<div className="relative w-full">
												<Input
													{...field}
													placeholder="Confirm Password"
													type={showPassword ? 'text' : 'password'}
												/>
												<Button
													type="button"
													variant="icon"
													onClick={() => setShowPassword((prev) => !prev)}
													className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
												>
													{showPassword ? (
														<EyeOff size={20} />
													) : (
														<Eye size={20} />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button type="submit" className="w-full">
							Sign Up
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center text-sm">
					Already a user?{' '}
					<Link href="/login" className="underline">
						Login
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
