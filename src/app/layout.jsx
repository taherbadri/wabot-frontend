import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/theme-provider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'Whatsapp Bulk Sender',
	description: 'Send Bulk Whatsapp Messages',
};

export default function RootLayout({ children }) {
	return (
		<StoreProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 `}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster position={'top-center'} richColors />
					</ThemeProvider>
				</body>
			</html>
		</StoreProvider>
	);
}
