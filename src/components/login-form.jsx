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
import { authenticationSchema } from '@/lib/schemas';
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
import { Eye, EyeIcon, EyeOff, Loader } from 'lucide-react';
import { useState } from 'react';

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm({
		resolver: zodResolver(authenticationSchema),
		defaultValues: {
			contact_number: '',
			password: '',
		},
	});
	const { isLoading, isEnterOTP } = useAppSelector(
		(store) => store.authentication
	);

	const dispatch = useAppDispatch();

	const onSubmit = (data) => {
		dispatch(loginUser(data));
		dispatch(setPhoneNumber(data.contact_number));
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your phone number below to login to your account
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
							name="password"
							render={({ field }) => {
								return (
									<FormItem>
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
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader className="animate-spin" /> Logging in...
								</>
							) : (
								'Login'
							)}
						</Button>
					</form>
				</Form>
				{/* <div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href="/sign-up" className="underline">
						Sign up
					</Link>
				</div> */}
			</CardContent>
		</Card>
	);
}

{
	/* <div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="#" className="underline">
						Sign up
					</Link>
				</div> */
}
