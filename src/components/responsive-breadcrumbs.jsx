'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function ResponsiveBreadcrumb({ segments }) {
	const [isMobile, setIsMobile] = React.useState(false);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const viewId = searchParams.get('id');

	React.useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 640);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const visibleSegments = isMobile ? segments.slice(-2) : segments;

	const getHref = (index) => {
		const path = `/${segments.slice(0, index + 1).join('/')}/`;
		if (path === pathname && viewId) {
			return `${path}?id=${viewId}`;
		}
		return path;
	};

	const isDetailsPage = segments[segments.length - 1] === 'details';

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{isMobile && segments.length > 2 && (
					<BreadcrumbItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">More pages</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{segments.slice(0, -2).map((segment, index) => (
									<DropdownMenuItem key={segment}>
										<BreadcrumbLink href={getHref(index)}>
											{index === 0 ? (
												<Home className="h-4 w-4 mr-2" aria-label="Home" />
											) : (
												segment
											)}
										</BreadcrumbLink>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>
				)}
				{visibleSegments.map((segment, index) => {
					const isFirstSegment =
						index === 0 && (!isMobile || segments.length <= 2);
					const isLastSegment = index === visibleSegments.length - 1;
					const href = getHref(segments.indexOf(segment));

					return (
						<React.Fragment key={`${segment}-${index}`}>
							<BreadcrumbItem>
								{isLastSegment && isDetailsPage ? (
									<BreadcrumbPage>Details</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href}>
										{isFirstSegment ? (
											<Home className="h-4 w-4" aria-label="Home" />
										) : (
											segment
										)}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLastSegment && (
								<BreadcrumbSeparator>
									<ChevronRight className="h-4 w-4" />
								</BreadcrumbSeparator>
							)}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
