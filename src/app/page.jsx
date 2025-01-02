import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<HeroSection>
				<section className="flex gap-2 items-center">
					<Button asChild variant="outline" className="rounded-full">
						<Link href={'/login'}>Login Page</Link>
					</Button>
				</section>
			</HeroSection>
		</>
	);
}
