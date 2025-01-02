'use client';
import MaterialisticTable from './materialistic-table';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function MaterialisticDonationManagementPage() {
	return (
		<div>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">
						Materialistic Donation List
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					<MaterialisticTable />
				</CardContent>
			</Card>
		</div>
	);
}
