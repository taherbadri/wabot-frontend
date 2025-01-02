import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserRegistrationForm } from '@/components/user-registration-form';

export default function RegisterVolunteerPage() {
	return (
		<Card className="w-full max-w-4xl shadow-none border-none">
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">
					Register Volunteer
				</CardTitle>
				<CardDescription>Enter volunteer&apos;s details below</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent>
				<UserRegistrationForm />
			</CardContent>
		</Card>
	);
}
