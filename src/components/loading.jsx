import { Loader2, LoaderCircle, LoaderPinwheel } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<LoaderPinwheel className="animate-spin" />
		</div>
	);
};

export default Loading;

export function LoadingDashboard() {
	return (
		<>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-6">
				{[...Array(6)].map((_, i) => (
					<Card key={i}>
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-4" />
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-16 mb-2" />
							<Skeleton className="h-4 w-32" />
						</CardContent>
					</Card>
				))}
			</div>

			<div className="min-h-[100dvh] flex-1 rounded-xl md:min-h-min mt-4">
				<section className="grid gap-4 lg:grid-cols-12">
					<Card className="lg:col-span-8 shadow">
						<CardHeader className="flex-row justify-between items-center">
							<CardTitle className="flex-1">
								<Skeleton className="h-6 w-40 mb-2" />
								<Skeleton className="h-4 w-64" />
							</CardTitle>
							<Skeleton className="h-10 w-32" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-[300px] w-full" />
						</CardContent>
					</Card>
					<Card className="lg:col-span-4 shadow">
						<CardHeader>
							<CardTitle>
								<Skeleton className="h-6 w-32 mb-2" />
								<Skeleton className="h-4 w-48" />
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Skeleton className="h-[300px] w-full rounded-full" />
						</CardContent>
					</Card>
				</section>
			</div>

			<div className="flex-1 rounded-xl mt-4">
				<section className="grid gap-4">
					{[...Array(2)].map((_, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle>
									<Skeleton className="h-6 w-48 mb-2" />
								</CardTitle>
								<Skeleton className="h-4 w-64" />
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-5 gap-4">
									{[...Array(5)].map((_, i) => (
										<Card key={i}>
											<CardHeader>
												<CardTitle className="flex justify-between items-center">
													<Skeleton className="h-4 w-20" />
													<Skeleton className="h-4 w-4" />
												</CardTitle>
											</CardHeader>
											<CardContent>
												<Skeleton className="h-8 w-16 mb-2" />
												<Skeleton className="h-4 w-32" />
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</section>
			</div>
		</>
	);
}
