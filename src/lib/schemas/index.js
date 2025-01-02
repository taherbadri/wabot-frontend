import {
	authenticationSchema,
	inputOtpSchema,
	signupSchema,
} from './authenticationSchema';
import {
	verifyPhoneNumberSchema,
	monetaryDonationSchema,
	personalDetailsSchema,
	materialisticDonationSchema,
	serviceDonationSchema,
	requestDonationFormSchema,
	requestDonationSchema,
	assignMonetaryDonationSchema,
} from './donationFormSchema';
import { userRegistrationSchema } from './userManagementSchema';
import { addAccountSchema, addExpenseSchema } from './donationManagementSchema';
import { z } from 'zod';

export const remarksSchema = z.object({
	remarks: z.string().optional(),
});

export {
	authenticationSchema,
	inputOtpSchema,
	signupSchema,
	verifyPhoneNumberSchema,
	monetaryDonationSchema,
	personalDetailsSchema,
	materialisticDonationSchema,
	serviceDonationSchema,
	userRegistrationSchema,
	requestDonationFormSchema,
	addAccountSchema,
	addExpenseSchema,
	requestDonationSchema,
	assignMonetaryDonationSchema,
};
