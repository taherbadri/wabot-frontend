'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DonationTable } from '@/components/donation-table';
import { AssignDonationDialog } from '@/components/assign-donation-dialog';

export function RequestDetails({
	requestData,
	onRemoveDonation,
	onStatusChange,
}) {
	const { status, category } = requestData;

	const handleStatusChange = (type) => {
		return (id, status) => {
			onStatusChange(type, id, status);
		};
	};

	const handleRemove = (type) => (id) => {
		onRemoveDonation(type, id);
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Request Information</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p>
								<strong>Request ID:</strong> {requestData.id}
							</p>
							<p>
								<strong>Beneficiary ID:</strong> {requestData.beneficiary_id}
							</p>
							<p>
								<strong>Request Date:</strong>{' '}
								{new Date(requestData.request_date).toLocaleString()}
							</p>
							<p>
								<strong>Description:</strong> {requestData.description}
							</p>
						</div>
						<div>
							<p>
								<strong>Name:</strong> {requestData.first_name}{' '}
								{requestData.last_name}
							</p>
							<p>
								<strong>Phone:</strong> {requestData.contact_number}
							</p>
							<p>
								<strong>Assigned To:</strong>{' '}
								{requestData.assign_to || 'Not assigned'}
							</p>
							<div className="flex items-center space-x-2">
								<strong>Status:</strong>
								<Badge style={{ backgroundColor: status.color }}>
									{status.name}
								</Badge>
							</div>
							<div className="flex items-center space-x-2">
								<strong>Category:</strong>
								<Badge style={{ backgroundColor: category.color }}>
									{category.name}
								</Badge>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Donations</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold mb-2">Monetary Donations</h3>
							<DonationTable
								data={requestData.details.monetary_donations}
								type="monetary"
								onStatusChange={handleStatusChange('Monetary')}
								onRemove={handleRemove('Monetary')}
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Service Donations</h3>
							<DonationTable
								data={requestData.details.service_donations}
								type="service"
								onStatusChange={handleStatusChange('Service')}
								onRemove={handleRemove('Service')}
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Material Donations</h3>
							<DonationTable
								data={requestData.details.material_donations}
								type="material"
								onStatusChange={handleStatusChange('Materialistic')}
								onRemove={handleRemove('Materialistic')}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
