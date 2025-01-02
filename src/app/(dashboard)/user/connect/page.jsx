'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { QRCodeDialog } from '@/components/qr-code-dialog';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Badge } from '@/components/ui/badge';
import {
	destroySession,
	sendMessage,
} from '@/lib/features/whatsapp/whatsappSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import UploadExcelForm from '@/components/upload-excel-form';
const messageSchema = z.object({
	message: z.string().min(1, { message: 'Message is required' }),
});
export default function ConnectPage() {
	const dispatch = useAppDispatch();
	const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
	const [number, setNumber] = useState('');
	const { connections } = useAppSelector((store) => store.whatsapp);
	const close = useCallback(() => {
		setIsQRDialogOpen(false); // Example logic
	}, []);

	return (
		<div className="grid grid-cols-12 gap-4">
			<Card className="col-span-12 md:col-span-6">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl flex items-center justify-between">
						<p>Upload Excel</p>
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					<UploadExcelForm />
				</CardContent>
			</Card>
			<Card className="col-span-12 md:col-span-6">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl">
						Connection Status
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent>
					{connections.length < 1 ? (
						<div className="flex flex-col items-center justify-center">
							<p className="text-sm text-muted-foreground">
								No connections found
							</p>
						</div>
					) : (
						<Table>
							<TableCaption>
								Your registered number&apos;s connection status
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Number</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{connections.map((connection) => {
									return (
										<TableRow key={connection.number} className="capitalize">
											<TableCell>+{connection.number}</TableCell>
											<TableCell>
												{connection.status === 'connected' ? (
													<Badge className="bg-green-500">Connected</Badge>
												) : (
													<Badge variant={'destructive'}>Disconnected</Badge>
												)}
											</TableCell>
											<TableCell className="flex items-center justify-end">
												{connection.status === 'connected' ? (
													<Button
														variant="outline"
														onClick={() =>
															dispatch(destroySession(connection.number))
														}
													>
														Disconnect
													</Button>
												) : (
													<Button
														variant="outline"
														onClick={() => {
															setIsQRDialogOpen(true);
															setNumber(connection.number);
														}}
													>
														Connect
													</Button>
												)}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</CardContent>
				<QRCodeDialog
					open={isQRDialogOpen}
					onOpenChange={setIsQRDialogOpen}
					number={number}
					close={close}
				/>
			</Card>
		</div>
	);
}
