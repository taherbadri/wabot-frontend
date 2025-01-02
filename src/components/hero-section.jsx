'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { AuroraBackground } from './ui/aurora-background';
import { HomeNavbar } from './home-navbar';

export function HeroSection({ children }) {
	return (
		<AuroraBackground>
			<motion.div
				initial={{ opacity: 0.0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
				className="relative flex flex-col gap-4 items-center justify-center px-4"
			>
				<div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
					Whatsapp Bulk Messenger
				</div>
				<div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
					&quot;Connect with your audience like never before&quot;
				</div>
				{children}
			</motion.div>
		</AuroraBackground>
	);
}
