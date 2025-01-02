import { CalendarIcon } from "lucide-react";
import { formatAmountInINR, formatDate } from "@/lib/utils";

export function ServiceDonationDetails({
	description,
	serviceValue,
	serviceStart,
	serviceEnd,
}) {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<p className="font-semibold">Service Description:</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold">Service Value:</span>
				<span className="text-2xl font-bold">
					{formatAmountInINR(serviceValue)}
				</span>
			</div>
			<div className="space-y-2">
				<p className="font-semibold">Service Period:</p>
				<div className="flex items-center text-sm text-muted-foreground">
					<CalendarIcon className="mr-2 h-4 w-4" />
					<span>
						{formatDate(serviceStart)} - {formatDate(serviceEnd)}
					</span>
				</div>
			</div>
		</div>
	);
}
