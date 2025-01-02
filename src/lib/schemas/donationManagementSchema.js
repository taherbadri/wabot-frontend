import { string, z } from 'zod';

export const addAccountSchema = z.object({
	account_name: z.string().min(5, { message: 'Account name is required' }),
	account_type: z.string().min(4, { message: 'Account type is required' }),
	user_id: z.string().min(1, { message: 'User id is required' }),
	bank_name: z.string().optional(),
	account_number: z.string().optional(),
	ifsc_code: z.string().optional(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export const addExpenseSchema = z.object({
	item_name: z.string().min(3, { message: 'Please provide item name' }),
	currency: z.string().min(1, { message: 'Please provide currency name' }),
	exchange_rate: z.string().min(1, { message: 'Please provide exchange rate' }),
	amount: z.string().min(1, { message: 'Please enter amount' }),
	expense_date: z.string().min(3, { message: 'Please enter expense date' }),
	category_id: z.string().min(1, { message: 'Category is needed' }),
	vendor_name: z.string().optional(),
	account_id: z.string().min(1, { message: 'Please select account' }),
	description: z.string().optional(),
	invoice_number: z.string().optional(),
	bill: z
		.array(
			z.object({
				file: z
					.any()
					.refine((file) => file instanceof File, 'Expected a File')
					.refine(
						(file) => ACCEPTED_FILE_TYPES.includes(file.type),
						'Only PNG, JPEG, and PDF files are accepted.'
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
