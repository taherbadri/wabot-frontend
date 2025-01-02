"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
	const { state } = useSidebar();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<NavItem key={item.title} item={item} sidebarState={state} />
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

function NavItem({ item, sidebarState }) {
	const [isOpen, setIsOpen] = React.useState(item.isActive);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<SidebarMenuItem className="flex flex-col">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton
						tooltip={sidebarState === "collapsed" ? item.title : undefined}
						className="w-full justify-between"
					>
						<div className="flex items-center">
							{item.icon && (
								<item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
							)}
							<span className="flex-grow">{item.title}</span>
						</div>
						{item.items?.length > 0 && (
							<ChevronRight
								className={cn(
									"ml-2 h-4 w-4 flex-shrink-0 transition-transform duration-200",
									isOpen && "rotate-90"
								)}
							/>
						)}
					</SidebarMenuButton>
				</CollapsibleTrigger>
				{item.items?.length > 0 && (
					<CollapsibleContent className="pt-1 pl-6">
						<SidebarMenuSub>
							{item.items.map((subItem) => (
								<SidebarMenuSubItem key={subItem.title}>
									<SidebarMenuSubButton asChild>
										<Link href={subItem.url}>
											<span>{subItem.title}</span>
										</Link>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				)}
			</SidebarMenuItem>
		</Collapsible>
	);
}
