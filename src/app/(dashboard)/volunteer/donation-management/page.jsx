import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DonationManagementPage() {
	return (
		<div className="flex h-full w-full items-center justify-center gap-4">
			<Button asChild>
				<Link href="/dashboard/admin/donation-management/monetary">
					Monetary
				</Link>
			</Button>
			<Button asChild>
				<Link href="/dashboard/admin/donation-management/service">Service</Link>
			</Button>
			<Button asChild>
				<Link href="/dashboard/admin/donation-management/materialistic">
					Materialistic
				</Link>
			</Button>
		</div>
	);
}
