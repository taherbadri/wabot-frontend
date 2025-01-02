import { CreditCardIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatAmountInINR } from "@/lib/utils";

export function MonetaryDonationDetails({
	amount,
	paymentMethod,
	transactionStatus,
}) {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<span className="font-semibold">Amount:</span>
				<span className="text-2xl font-bold">{formatAmountInINR(amount)}</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold">Payment Method:</span>
				<Badge variant="outline">
					<CreditCardIcon className="mr-1 h-3 w-3" />
					{paymentMethod}
				</Badge>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold">Transaction Status:</span>
				<Badge variant="secondary">{transactionStatus}</Badge>
			</div>
		</div>
	);
}
