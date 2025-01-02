'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';

import { inputOtpSchema } from '@/lib/schemas';
import { Button } from './ui/button';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { verifyOTP } from '@/lib/features/authentication/authenticationSlice';
import { Loader } from 'lucide-react';

export const InputOTPForm = () => {
	const form = useForm({
		resolver: zodResolver(inputOtpSchema),
		defaultValues: {
			otp: '',
		},
	});
	const { contact_number, isLoading } = useAppSelector(
		(store) => store.authentication
	);
	const dispatch = useDispatch();
	const onSubmit = ({ otp }) => {
		if (!contact_number) {
			toast.error('Phone number missing');
			return;
		}
		dispatch(verifyOTP({ contact_number, otp }));
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Verify</CardTitle>
				<CardDescription>One Time Password</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
						<FormField
							className="w-full"
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormItem>
									<FormControl>
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
									</FormControl>
									<FormDescription>
										Please enter the one-time password sent to your phone.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading && <Loader className="animate-spin" />}
							Submit
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center text-sm">
					Didn&apos;t receive OTP?{' '}
					<Link href="#" className="underline">
						Resend OTP
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
