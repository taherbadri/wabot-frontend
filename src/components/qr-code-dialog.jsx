'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	fetchWhatsappQr,
	checkConnectionStatus,
} from '@/lib/features/whatsapp/whatsappSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Loading from '@/components/loading';
import { toast } from 'sonner';

export function QRCodeDialog({ open, onOpenChange, number, close }) {
	const dispatch = useAppDispatch();
	const { qrImage, isLoading } = useAppSelector((state) => state.whatsapp);

	useEffect(() => {
		if (open) {
			console.log('Initializing socket and fetching QR code...');
			dispatch(fetchWhatsappQr(number));

			const socket = io('http://localhost:3001');

			// Attach event listeners
			socket.on('authenticated', (data) => {
				// toast.success(
				// 	data.message + ', Please wait while we prepare the connection.'
				// );
				toast.success('Please wait while we prepare the connection.');
			});

			socket.on('ready', (data) => {
				// toast.success(data.message);
				toast.success(`Connected to Whatsapp, Ready to send messages.`);
				close(); // Ensure this is stable
			});

			socket.on('malicious', (data) => {
				toast.error(data.message);
				close(); // Ensure this is stable
			});

			socket.on('not-scanned', (data) => {
				toast.error(data.message);
				close(); // Ensure this is stable
			});

			// Cleanup
			return () => {
				console.log('Cleaning up socket listeners...');
				socket.off('ready');
				socket.off('malicious');
				socket.off('authenticated');
				socket.off('not-scanned');
				socket.disconnect();
			};
		}
	}, [open, number]); // Keep the dependency array minimal

	useEffect(() => {
		if (!open) {
			dispatch(checkConnectionStatus());
		}
	}, [open, dispatch]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Scan QR Code</DialogTitle>
				</DialogHeader>
				<div className="flex items-center justify-center p-6">
					{isLoading ? (
						<div className="flex flex-col items-center justify-center gap-4">
							<Loading />
							<p>Loading QR code...</p>
						</div>
					) : qrImage ? (
						<Image
							src={qrImage}
							alt="WhatsApp QR Code"
							width={400}
							height={400}
						/>
					) : (
						<p>Failed to load QR code. Please try again.</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
