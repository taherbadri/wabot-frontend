import axios from 'axios';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const customFetch = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
});
console.log(
	`file: utils.js:15 - process.env.BACKEND_URL:`,
	process.env.BACKEND_URL
);

export function transformChartData(data, interval) {
	switch (interval) {
		case 'day':
			// Format date as full date (e.g., "Nov 07, 2024")
			return data.map((item) => ({
				date: moment(item.date).format('MMM DD, YYYY'), // formatted as "Nov 07, 2024"
				total_donations: parseInt(item.total_donations || 0),
				completed: parseInt(item.total_completed_donations || 0),
				working: parseInt(item.total_working_donations || 0),
				pending: parseInt(item.total_pending_donations || 0),
				rejected: parseInt(item.total_rejected_donations || 0),
				unassigned: parseInt(item.total_unassigned_donations || 0),
			}));

		case 'month':
			// Format date as full month name and year (e.g., "November 2024")
			const monthlyData = {};
			data.forEach((item) => {
				const month = moment(item.date).format('MMMM YYYY'); // formatted as "November 2024"
				if (!monthlyData[month]) {
					monthlyData[month] = {
						total_donations: 0,
						approved: 0,
						pending: 0,
						rejected: 0,
						unassigned: 0,
					};
				}
				monthlyData[month].total_donations += parseInt(
					item.total_donations || 0
				);
				monthlyData[month].approved += parseInt(
					item.total_approved_donations || 0
				);
				monthlyData[month].pending += parseInt(
					item.total_pending_donations || 0
				);
				monthlyData[month].rejected += parseInt(
					item.total_rejected_donations || 0
				);
				monthlyData[month].unassigned += parseInt(
					item.total_unassigned_donations || 0
				);
			});
			return Object.keys(monthlyData).map((month) => ({
				date: month, // e.g., "November 2024"
				...monthlyData[month],
			}));

		case 'year':
			// Use only the year as the label (e.g., "2024")
			const yearlyData = {};
			data.forEach((item) => {
				const year = moment(item.date).format('YYYY'); // formatted as "2024"
				if (!yearlyData[year]) {
					yearlyData[year] = {
						total_donations: 0,
						approved: 0,
						pending: 0,
						rejected: 0,
						unassigned: 0,
					};
				}
				yearlyData[year].total_donations += parseInt(item.total_donations || 0);
				yearlyData[year].approved += parseInt(
					item.total_approved_donations || 0
				);
				yearlyData[year].pending += parseInt(item.total_pending_donations || 0);
				yearlyData[year].rejected += parseInt(
					item.total_rejected_donations || 0
				);
				yearlyData[year].unassigned += parseInt(
					item.total_unassigned_donations || 0
				);
			});
			return Object.keys(yearlyData).map((year) => ({
				date: year, // e.g., "2024"
				...yearlyData[year],
			}));

		default:
			return [];
	}
}

// Utility function to format API response for pie chart
export function formatDonationTypeData(data) {
	// Create pieChartData array from the API response
	const pieChartData = [
		{
			type: 'monetary',
			donation: data?.total_monetary_donations,
			fill: 'var(--color-monetary)',
		},
		{
			type: 'materialistic',
			donation: data?.total_materialistic_donations,
			fill: 'var(--color-materialistic)',
		},
		{
			type: 'service',
			donation: data?.total_service_donations,
			fill: 'var(--color-service)',
		},
	];

	// Calculate total donations by summing up all donation types
	const totalDonations = pieChartData.reduce(
		(acc, curr) => acc + curr.donation,
		0
	);

	return { pieChartData, totalDonations };
}

export const formatAmountInINR = (amount) => {
	const numAmount = parseFloat(amount);
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 2,
	}).format(numAmount);
};

export const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
