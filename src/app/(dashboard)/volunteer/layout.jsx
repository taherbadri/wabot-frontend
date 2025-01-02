"use client";

import MainSidebar from "@/components/main-sidebar";
import ProtectedLayout from "@/components/protected-layout";

export default function VolunteerDashboardLayout({ children }) {
	return (
		<ProtectedLayout userType={"volunteer"}>
			<MainSidebar>{children}</MainSidebar>
		</ProtectedLayout>
	);
}
