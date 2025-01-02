import RequestDonationForm from '@/components/request-donation_form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function RequestDonationPage() {
	return (
		<Card className="w-full max-w-4xl shadow-none border-none">
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">Request Donation</CardTitle>
				<CardDescription>Enter donation details below</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent>
				<RequestDonationForm />
			</CardContent>
		</Card>
	);
}
