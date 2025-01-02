import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DataTableCellContent({ type, value, details }) {
	let popoverContent;
	switch (type) {
		case "donor":
			popoverContent = (
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Donor Details</h4>
						<p className="text-sm text-muted-foreground">
							ID: {details.id}
							<br />
							Phone: {details.phone}
						</p>
					</div>
				</div>
			);
			break;
		case "donation":
			popoverContent = (
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Donation Details</h4>
						{details.type === "Monetary" && (
							<p className="text-sm text-muted-foreground">
								Amount: ₹{details.amount}
								<br />
								Payment Method: {details.payment_method}
								<br />
								Transaction Status: {details.transaction_status}
							</p>
						)}
						{details.type === "Materialistic" && (
							<p className="text-sm text-muted-foreground">
								Item: {details.item_name}
								<br />
								Description: {details.description}
								<br />
								Pickup Address: {details.pickup_address}
								<br />
								Pickup Timings: {details.pickup_timings}
								<br />
								Alternate Phone: {details.alternate_phone}
							</p>
						)}
						{details.type === "Service" && (
							<p className="text-sm text-muted-foreground">
								Description: {details.description}
								<br />
								Service Start: {details.service_start}
								<br />
								Service End: {details.service_end}
								<br />
								Service Value: ₹{details.service_value}
							</p>
						)}
					</div>
				</div>
			);
			break;
		default:
			return <div>{value}</div>;
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link" className="p-0 h-auto font-normal">
					{value}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">{popoverContent}</PopoverContent>
		</Popover>
	);
}
