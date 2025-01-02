'use client';

import * as React from 'react';

import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	Label,
	Pie,
	PieChart,
	YAxis,
} from 'recharts';

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	completed: {
		label: 'Completed',
		color: 'hsl(var(--chart-1))',
	},
	working: {
		label: 'Working',
		color: 'hsl(var(--chart-6))',
	},
	pending: {
		label: 'Pending',
		color: 'hsl(var(--chart-2))',
	},
	rejected: {
		label: 'Rejected',
		color: 'hsl(var(--chart-3))',
	},
	unassigned: {
		label: 'Unassigned',
		color: 'hsl(var(--chart-4))',
	},
	total_donations: {
		label: 'Total Donations',
		color: 'hsl(var(--chart-5))',
	},
};

export const LineChartComponent = ({ data }) => {
	return (
		<ChartContainer config={chartConfig} className={'max-h-80 w-full'}>
			<LineChart
				data={data}
				margin={{
					left: 8,
					right: 8,
				}}
			>
				<CartesianGrid vertical={true} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					label={{ value: 'Donations', angle: -90, position: 'insideLeft' }}
				/>
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Line
					dataKey="total_donations"
					type="monotone"
					stroke="var(--color-total_donations)"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="completed"
					type="monotone"
					stroke="var(--color-completed)"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="working"
					type="monotone"
					stroke="var(--color-working)"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="pending"
					type="monotone"
					stroke="var(--color-pending)"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="rejected"
					type="monotone"
					stroke="var(--color-rejected)"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="unassigned"
					type="monotone"
					stroke="var(--color-unassigned)"
					strokeWidth={2}
					dot={true}
				/>
			</LineChart>
		</ChartContainer>
	);
};

// Pie chart config for each donation type
const pieChartConfig = {
	donation: {
		label: 'Donation Type',
	},
	monetary: {
		label: 'Monetary Donations',
		color: 'hsl(var(--chart-1))',
	},
	materialistic: {
		label: 'Materialistic Donations',
		color: 'hsl(var(--chart-2))',
	},
	service: {
		label: 'Service Donations',
		color: 'hsl(var(--chart-3))',
	},
};

export function PieChartComponent({ data }) {
	return (
		<ChartContainer config={pieChartConfig} className="mx-auto aspect-square ">
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data?.pieChartData}
					dataKey="donation"
					nameKey="type"
					innerRadius={60}
					strokeWidth={5}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{data?.totalDonations.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Total Donations
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
