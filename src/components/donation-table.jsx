import { useState } from 'react';
import Image from 'next/image';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const statusOptions = ['fulfilled', 'postponed', 'not satisfied', 'cancelled'];

export function DonationTable({ data, type, onStatusChange, onRemove }) {
	const [openPopover, setOpenPopover] = useState(null);

	if (data.length === 0) {
		return <p className="text-muted-foreground">No donations assigned yet.</p>;
	}

	return (
		<ScrollArea className="max-h-52 overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						{type === 'monetary' && (
							<>
								<TableHead>Amount</TableHead>
								<TableHead>Currency</TableHead>
								<TableHead>Exchange Rate</TableHead>
								<TableHead>Transaction Date</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Created By</TableHead>
								<TableHead>Account Details</TableHead>
							</>
						)}
						{type === 'service' && (
							<>
								<TableHead>Description</TableHead>
								<TableHead>Service Period</TableHead>
								<TableHead>Service Value</TableHead>
								<TableHead>Assigned To</TableHead>
							</>
						)}
						{type === 'material' && (
							<>
								<TableHead>Item Name</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Pickup Address</TableHead>
								<TableHead>Availability</TableHead>
								<TableHead>Assigned To</TableHead>
								<TableHead>Images</TableHead>
							</>
						)}
						<TableHead>Status</TableHead>
						{type !== 'monetary' && <TableHead>Change Status</TableHead>}
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((donation) => (
						<TableRow key={donation.id}>
							<TableCell>{donation.id}</TableCell>
							{type === 'monetary' && (
								<>
									<TableCell>{donation.amount}</TableCell>
									<TableCell>{donation.currency}</TableCell>
									<TableCell>{donation.exchange_rate}</TableCell>
									<TableCell>
										{new Date(donation.transaction_date).toLocaleString()}
									</TableCell>
									<TableCell>{donation.description}</TableCell>
									<TableCell>{`${donation.created_by_details.first_name} ${donation.created_by_details.last_name}`}</TableCell>
									<TableCell>
										<Popover>
											<PopoverTrigger asChild>
												<Button variant="outline" size="sm">
													View Details
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-80">
												<div className="grid gap-4">
													<div className="space-y-2">
														<h4 className="font-medium leading-none">
															Account Details
														</h4>
														<p className="text-sm text-muted-foreground">
															Bank: {donation.user_account_details.bank_name}
														</p>
														<p className="text-sm text-muted-foreground">
															Account:{' '}
															{donation.user_account_details.account_number}
														</p>
														<p className="text-sm text-muted-foreground">
															IFSC: {donation.user_account_details.ifsc_code}
														</p>
													</div>
												</div>
											</PopoverContent>
										</Popover>
									</TableCell>
								</>
							)}
							{type === 'service' && (
								<>
									<TableCell>{donation.description}</TableCell>
									<TableCell>{`${donation.service_start} to ${donation.service_end}`}</TableCell>
									<TableCell>{donation.service_value}</TableCell>
									<TableCell>{`${donation.assign_to.first_name} ${donation.assign_to.last_name}`}</TableCell>
								</>
							)}
							{type === 'material' && (
								<>
									<TableCell>{donation.item_name}</TableCell>
									<TableCell>{donation.description}</TableCell>
									<TableCell>{donation.quantity}</TableCell>
									<TableCell>{donation.pickup_address}</TableCell>
									<TableCell>
										{donation.availability_start} to {donation.availability_end}
									</TableCell>
									<TableCell>
										{donation.assign_to
											? `${donation.assign_to.first_name} ${donation.assign_to.last_name}`
											: 'Not assigned'}
									</TableCell>
									<TableCell>
										<Popover
											open={openPopover === donation.id}
											onOpenChange={(open) =>
												setOpenPopover(open ? donation.id : null)
											}
										>
											<PopoverTrigger asChild>
												<Button variant="outline" size="sm">
													View Images ({donation.images.length})
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-80">
												<div className="grid gap-4 max-h-52 overflow-y-auto">
													{donation.images.map((image, index) => (
														<AspectRatio key={index} ratio={16 / 9}>
															<Image
																src={image}
																alt={`${donation.item_name} image ${index + 1}`}
																fill
																className="rounded-md object-cover"
															/>
														</AspectRatio>
													))}
												</div>
											</PopoverContent>
										</Popover>
									</TableCell>
								</>
							)}
							<TableCell>
								<Badge
									style={{
										backgroundColor:
											donation.status.color ||
											(typeof donation.status === 'string'
												? '#6c757d'
												: donation.status.color),
									}}
								>
									{typeof donation.status === 'string'
										? donation.status
										: donation.status.name}
								</Badge>
							</TableCell>
							{type !== 'monetary' && (
								<TableCell>
									<Select
										onValueChange={(value) =>
											onStatusChange(donation.id, value)
										}
										defaultValue={
											typeof donation.status === 'string'
												? donation.status
												: donation.status.name
										}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Change status" />
										</SelectTrigger>
										<SelectContent>
											{statusOptions.map((option) => (
												<SelectItem key={option} value={option}>
													{option.charAt(0).toUpperCase() + option.slice(1)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</TableCell>
							)}
							<TableCell>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive" size="sm">
											Remove
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the donation and remove it from our servers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={() => onRemove(donation.id)}>
												Remove
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
}
