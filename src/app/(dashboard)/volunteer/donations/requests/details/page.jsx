'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RequestDetails } from '@/components/request-details';
import Loading from '@/components/loading';
import { AssignDonationDialog } from '@/components/assign-donation-dialog';

import {
	assignDonation,
	fetchRequestDetails,
} from '@/lib/features/donation/donationSlice';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	changeDonationRequestRecordStatus,
	removeDonationRequestRecord,
} from '@/lib/features/donation/donationSlice';

export default function RequestDetailsPage() {
	const [activeDialog, setActiveDialog] = useState(null);
	const id = useSearchParams().get('id');
	const dispatch = useAppDispatch();
	const { requestDetails, isLoading } = useAppSelector(
		(store) => store.donation
	);

	useEffect(() => {
		if (id) {
			dispatch(fetchRequestDetails(id));
		}
	}, [dispatch, id]);

	const handleAssignDonation = (type, data) => {
		if (id) {
			dispatch(
				assignDonation({
					requestId: id,
					donationType: type,
					donationData: data,
				})
			);
		}
	};

	const handleStatusChange = (type, donationId, status) => {
		if (id) {
			dispatch(
				changeDonationRequestRecordStatus({
					request_id: id,
					type,
					id: donationId,
					status,
				})
			);
			console.log(`file: page.jsx:57 - handleStatusChange :`, {
				requestId: id,
				donationType: type,
				donationId,
				status,
			});
		}
	};

	const handleRemoveDonation = (type, donationId) => {
		console.log(`file: page.jsx:69 - handleRemoveDonation : `, {
			requestId: id,
			donationType: type,
			donationId,
		});
		if (id) {
			dispatch(
				removeDonationRequestRecord({ request_id: id, type, id: donationId })
			);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (!requestDetails) {
		return <div>No request data available</div>;
	}

	return (
		<>
			<Card className="w-full shadow-none border-none">
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<p className="text-xl md:text-2xl">Request Details</p>
						<div className="grid md:grid-cols-3  gap-2">
							<Button onClick={() => setActiveDialog('Monetary')}>
								Assign Monetary Donation
							</Button>
							<Button onClick={() => setActiveDialog('Service')}>
								Assign Service Donation
							</Button>
							<Button onClick={() => setActiveDialog('Materialistic')}>
								Assign Material Donation
							</Button>
						</div>
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					<RequestDetails
						requestData={requestDetails}
						onAssignDonation={handleAssignDonation}
						onStatusChange={handleStatusChange}
						onRemoveDonation={handleRemoveDonation}
					/>
				</CardContent>
			</Card>
			<AssignDonationDialog
				isOpen={activeDialog !== null}
				onClose={() => setActiveDialog(null)}
				donationType={activeDialog}
				requestId={id}
			/>
		</>
	);
}
