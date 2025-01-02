import AuthenticatedUserDonationForm from '@/components/authenticated-user-donation-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserRegistrationForm } from '@/components/user-registration-form';

export default function AuthorizedUserDonatePage() {
	return (
		<Card className="w-full max-w-4xl shadow-none border-none">
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">Donate</CardTitle>
				<CardDescription>Enter donation details below</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent>
				<AuthenticatedUserDonationForm />
			</CardContent>
		</Card>
		// <div className="flex items-center justify-center w-full h-full">
		// </div>
	);
}
