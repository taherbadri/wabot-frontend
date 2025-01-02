import { remarksSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';

export default function Remarks({ remarksData, endpoint }) {
	const form = useForm({
		resolver: zodResolver(remarksSchema),
		defaultValues: {
			remarks: '',
		},
	});

	const onSubmit = (data) => {
		console.log(`file: remarks.jsx:14 - onSubmit - data:`, {
			data,
			remarksData,
			endpoint,
		});
	};

	return (
		<Card className="my-4">
			<CardHeader>
				<CardTitle>Remarks</CardTitle>
				<CardDescription>Enter remarks below</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent>
						<FormField
							control={form.control}
							name="remarks"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea className="resize-none md:resize-y" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button type="submit">Submit</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
