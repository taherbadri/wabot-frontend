import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function HomeNavbar() {
	return (
		<nav className="px-8 sticky top-0 z-50">
			<div className="container flex items-center justify-between py-4">
				<Link href="/" className="text-xl font-bold">
					Logo
				</Link>
				<div className="hidden md:flex gap-2">
					<Button asChild variant="outline" className="rounded-full">
						<Link href="/login">Login Page</Link>
					</Button>
					<Button asChild variant="outline" className="rounded-full">
						<Link href="/donate">Donate</Link>
					</Button>
					<Button asChild variant="outline" className="rounded-full">
						<Link href="/request">Request Donation</Link>
					</Button>
				</div>
				<Button variant="outline" size="icon" className="md:hidden">
					<Menu className="h-6 w-6" />
				</Button>
			</div>
		</nav>
	);
}
