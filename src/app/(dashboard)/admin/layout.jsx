"use client";

import MainSidebar from "@/components/main-sidebar";
import ProtectedLayout from "@/components/protected-layout";

export default function AdminDashboardLayout({ children }) {
	return (
		<ProtectedLayout userType={"admin"}>
			<MainSidebar>{children}</MainSidebar>
		</ProtectedLayout>
	);
}
