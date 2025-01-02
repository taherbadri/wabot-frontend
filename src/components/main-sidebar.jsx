import { AppSidebar } from '@/components/app-sidebar';

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ModeToggle } from './theme-provider';
import { ResponsiveBreadcrumb } from './responsive-breadcrumbs';

export default function MainSidebar({ children }) {
	const pathname = usePathname();
	const segments = pathname.replace(/^\//, '').split('/');

	// the below was used when the path was /dashboard/user_type now the path is /user_type
	// const segments = pathname
	// 	.replace(/^\//, "")
	// 	.split("/")
	// 	.filter((segment) => segment !== "dashboard");
	return (
		<SidebarProvider defaultOpen={true}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 justify-between pr-4 overflow-hidden">
					<div className="flex items-center gap-2 px-4 capitalize">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<ResponsiveBreadcrumb segments={segments} />
					</div>
					<ModeToggle />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-1 md:p-4 overflow-hidden">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
