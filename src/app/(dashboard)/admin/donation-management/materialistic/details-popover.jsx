'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function DonationItemCellContent({ value, details, type }) {
	const itemDetailsContent = (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Donation Item Details</h4>
				<p className="text-sm text-muted-foreground">
					ID: {details.id}
					<br />
					Item: {details.item_name}
					<br />
					Description: {details.description}
					<br />
					Pickup Address: {details.pickup_address}
					<br />
					Alternate Phone: {details.alternate_phone}
					<br />
					Availability: {details.availability_start} to{' '}
					{details.availability_end}
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

	const imagesContent = (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Donation Item Images</h4>
				{details.images && details.images.length > 0 ? (
					<div className="grid grid-cols-2 gap-2">
						{details.images.map((image, index) => (
							<AspectRatio ratio={4 / 4} key={index}>
								<Image
									key={index}
									src={image}
									fill
									alt={`Donation item ${index + 1}`}
									className="w-full h-auto object-cover rounded"
								/>
							</AspectRatio>
						))}
					</div>
				) : (
					<p className="text-sm text-muted-foreground">No images available</p>
				)}
			</div>
		</div>
	);

	const popoverContent =
		type === 'item_name' ? itemDetailsContent : imagesContent;

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
