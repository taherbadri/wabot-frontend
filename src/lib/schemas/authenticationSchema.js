import { z } from 'zod';

export const authenticationSchema = z.object({
	contact_number: z
		.string()
		.min(10, {
			message: 'Phone number must be at least 10 digits',
		})
		.max(10, { message: 'Phone number must be at most 10 digits' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});

export const inputOtpSchema = z.object({
	otp: z
		.string()
		.min(6, { message: 'OTP must be at least 6 digits' })
		.max(6, { message: 'OTP must be at most 6 digits' }),
});

export const signupSchema = z
	.object({
		contact_number: z
			.string()
			.min(10, {
				message: 'Phone number must be at least 10 digits',
			})
			.max(10, { message: 'Phone number must be at most 10 digits' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
				message:
					'Password must contain at least one uppercase letter, one lowercase letter, and one number',
			}),
		confirm_password: z.string(),
	})
	.refine(
		({ password, confirm_password }) => {
			return password === confirm_password;
		},
		{
			message: 'Passwords do not match',
			path: ['confirm_password'],
		}
	);
