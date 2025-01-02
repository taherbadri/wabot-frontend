'use client';
import ServiceTable from './service-table';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ServiceDonationManagementPage() {
	return (
		<div>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">
						Service Donation List
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					<ServiceTable />
				</CardContent>
			</Card>
		</div>
	);
}
