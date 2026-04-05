"use client";

import { Home, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserMenu } from "@/components/user-menu";

const navItems = [
	{ title: "Home", href: "/dashboard", icon: Home },
	{ title: "About", href: "/dashboard/about", icon: Info },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<TooltipProvider>
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader className="px-4 py-3">
						<span className="text-sm font-semibold tracking-tight">
							GroupChat Convex Starter
						</span>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									{navItems.map((item) => (
										<SidebarMenuItem key={item.href}>
											<SidebarMenuButton
												asChild
												isActive={pathname === item.href}
											>
												<Link href={item.href}>
													<item.icon />
													<span>{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<header className="flex h-12 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<div className="ml-auto">
							<UserMenu />
						</div>
					</header>
					<main className="flex-1 p-6">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
