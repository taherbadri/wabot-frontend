import { z } from 'zod';

export const userRegistrationSchema = z
	.object({
		first_name: z.string().min(3, { message: 'First name is required' }),
		last_name: z.string().min(1, { message: 'Last name is required' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		address: z.string().min(5, { message: 'Address is required' }),
		contact_number: z
			.string()
			.min(10, { message: 'Phone number is required' })
			.max(10, { message: 'Phone number is required' }),
		city: z.string().min(3, { message: 'City is required' }),
		pincode: z.string().min(6, { message: 'Pincode is required' }),
		state: z.string().min(5, { message: 'State is required' }),
		country: z.string().min(5, { message: 'Country is required' }),
		is_admin: z.boolean().default(false),
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
