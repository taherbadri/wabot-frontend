import { z } from 'zod';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const verifyPhoneNumberSchema = z.object({
	contact_number: z
		.string()
		.min(10, {
			message: 'Phone number must be at least 10 digits',
		})
		.max(10, { message: 'Phone number must be at most 10 digits' }),
});

export const personalDetailsSchema = z
	.object({
		first_name: z.string().min(3, { message: 'First name is required' }),
		last_name: z.string().min(1, { message: 'Last name is required' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		address: z.string().min(5, { message: 'Address is required' }),
		city: z.string().min(3, { message: 'City is required' }),
		pincode: z.string().min(6, { message: 'Pincode is required' }),
		state: z.string().min(5, { message: 'State is required' }),
		country: z.string().min(5, { message: 'Country is required' }),
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

export const monetaryDonationSchema = z.object({
	amount: z.string().min(3, { message: 'Amount is required' }),
	payment_method: z.string().min(3, { message: 'Payment method is required' }),
	category_id: z.string().min(1, { message: 'Category is required' }),
});

export const materialisticDonationSchema = z.object({
	category_id: z.string().min(1, { message: 'Category is required' }),
	item_name: z.string().min(3, { message: 'Item name is required' }),
	description: z.string().min(10, { message: 'Description is required' }),
	pickup_address: z.string().min(10, { message: 'Pickup address is required' }),
	alternate_phone: z
		.string()
		.min(10, { message: 'Alternate phone must be at least 10 digits' })
		.max(10, { message: 'Alternate phone must be at most 10 digits' }),
	availability_start: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid start date',
	}),
	availability_end: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid end date',
	}),
	images: z
		.array(
			z.object({
				file: z
					.any()
					.refine((file) => file instanceof File, 'Expected a File')
					.refine(
						(file) => ACCEPTED_FILE_TYPES.includes(file.type),
						'Only PNG, JPEG, and JPG files are accepted.'
					)
					.refine(
						(file) => file.size <= MAX_FILE_SIZE,
						'Max file size is 5MB.'
					),
			})
		)
		.max(5, 'You can upload up to 5 files.')
		.optional(),
});

export const serviceDonationSchema = z.object({
	category_id: z.string().min(1, { message: 'Category is required' }),
	description: z.string().min(10, { message: 'Description is required' }),
	service_start: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid start date',
	}),
	service_end: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid end date',
	}),
	service_value: z.string().min(3, { message: 'Amount is required' }),
});

export const requestDonationFormSchema = z.object({
	first_name: z.string().min(3, { message: 'First name is required' }),
	last_name: z.string().min(1, { message: 'Last name is required' }),
	address: z.string().min(5, { message: 'Address is required' }),
	contact_number: z
		.string()
		.min(10, { message: 'Phone number should be at least 10 digits' })
		.max(10, { message: 'Phone number should be at most 10 digits' }),
	city: z.string().min(3, { message: 'City is required' }),
	pincode: z.string().min(6, { message: 'Pincode is required' }),
	state: z.string().min(5, { message: 'State is required' }),
	country: z.string().min(5, { message: 'Country is required' }),
	description: z.string().min(10, { message: 'Description is required' }),
	category: z.string(),
	assign_to: z.string(),
	status: z.string(),
});

export const monetaryDonationCompletionFormSchema = z.object({
	account_id: z.string().min(1, { message: 'Account id is required' }),
	transaction_date: z
		.string()
		.min(1, { message: 'Transaction Date is required' }),
	description: z
		.string()
		.min(6, { message: 'Description should be at least 6 characters' })
		.max(200, { message: 'Description should be at most 200 characters' }),
});

export const requestDonationSchema = z.object({
	category_id: z.string().min(1, { message: 'Please select a category' }),
	description: z
		.string()
		.min(10, { message: 'Description should be at least 10 characters' })
		.max(200, { message: 'Description should be at most 200 characters' }),
});

export const assignMonetaryDonationSchema = z.object({
	account_id: z.string().min(1, { message: 'Please select an account' }),
	currency: z.string().min(1, { message: 'Please select a currency' }),
	exchange_rate: z.string().min(1, { message: 'Please enter exchange rate' }),
	amount: z.string().min(1, { message: 'Please enter amount' }),
	transaction_date: z
		.string()
		.min(1, { message: 'Please enter transaction date' }),
	description: z.string().min(1, { message: 'Please enter description' }),
	bank_name: z.string().min(1, { message: 'Please enter bank name' }),
	account_number: z.string().min(1, { message: 'Please enter account number' }),
	ifsc_code: z.string().min(1, { message: 'Please enter IFSC code' }),
});
