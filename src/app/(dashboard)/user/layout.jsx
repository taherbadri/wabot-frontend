'use client';

import MainSidebar from '@/components/main-sidebar';
import ProtectedLayout from '@/components/protected-layout';

export default function userDashboardLayout({ children }) {
	return (
		<ProtectedLayout userType={'user'}>
			<MainSidebar>{children}</MainSidebar>
		</ProtectedLayout>
	);
}
