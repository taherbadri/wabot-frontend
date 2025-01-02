import { MapPinIcon, ClockIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function MaterialisticDonationDetails({
	itemName,
	description,
	pickupAddress,
	availabilityStart,
	availabilityEnd,
	images = [],
}) {
	return (
		<div className="space-y-6">
			{images.length > 0 && (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{images.map((image, index) => (
						<div
							key={index}
							className="relative aspect-square overflow-hidden rounded-lg"
						>
							<AspectRatio ratio={4 / 4} className="bg-muted">
								<Image
									src={image}
									alt={`${itemName} - Image ${index + 1}`}
									width={100}
									height={100}
									className="w-full h-full transition-transform hover:scale-105 object-scale-down"
								/>
							</AspectRatio>
						</div>
					))}
				</div>
			)}

			<div className="space-y-4">
				<div className="space-y-2">
					<p className="font-semibold">Item Name:</p>
					<p className="text-lg">{itemName}</p>
				</div>
				<div className="space-y-2">
					<p className="font-semibold">Description:</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="space-y-2">
					<p className="font-semibold">Pickup Address:</p>
					<div className="flex items-center text-sm text-muted-foreground">
						<MapPinIcon className="mr-2 h-4 w-4" />
						<span>{pickupAddress}</span>
					</div>
				</div>
				<div className="space-y-2">
					<p className="font-semibold">Availability Period:</p>
					<div className="flex items-center text-sm text-muted-foreground">
						<ClockIcon className="mr-2 h-4 w-4" />
						<span>
							{formatDate(availabilityStart)} - {formatDate(availabilityEnd)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
