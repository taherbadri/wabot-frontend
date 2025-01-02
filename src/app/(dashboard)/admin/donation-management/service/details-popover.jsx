'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

export function ServiceItemCellContent({ value, details, type }) {
	const serviceDetailsContent = (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Service Item Details</h4>
				<p className="text-sm text-muted-foreground">
					ID: {details.id}
					<br />
					Description: {details.description}
					<br />
					Service Start: {details.service_start}
					<br />
					Service End: {details.service_end}
					<br />
					Service Value: ${details.service_value}
					<br />
					Donation Date: {details.donation_date}
					<br />
					Category: {details.category.name}
					<br />
					Status: {details.status.name}
					<br />
					Assigned To: {details.assign_to.first_name}{' '}
					{details.assign_to.last_name}
					<br />
					Assignee Contact: {details.assign_to.email},{' '}
					{details.assign_to.contact_number}
				</p>
			</div>
		</div>
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link" className="p-0 h-auto font-normal">
					{value}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">{serviceDetailsContent}</PopoverContent>
		</Popover>
	);
}
