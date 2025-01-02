import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAccountSchema } from "@/lib/schemas";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUsers } from "@/lib/features/user/userSlice";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useEffect } from "react";
import {
	createAccount,
	updateAccount,
} from "@/lib/features/donation/donationManagementSlice";
export function AddAccountForm({ children, close, account }) {
	const { users } = useAppSelector((store) => store.user);
	const form = useForm({
		resolver: zodResolver(addAccountSchema),
		defaultValues: {
			account_name: account?.account_name || "",
			account_type: account?.account_type || "",
			user_id: account?.user_id || "",
			bank_name: account?.bank_name || "",
			account_number: account?.account_number || "",
			ifsc_code: account?.ifsc_code || "",
		},
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers("admins"));
	}, [dispatch]);

	const onSubmit = (data) => {
		if (account?.id) {
			dispatch(updateAccount({ id: account.id, ...data }));
		} else {
			dispatch(createAccount(data));
		}
		close();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-12 gap-2 md:gap-4 p-2"
			>
				<FormField
					control={form.control}
					name="account_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Account Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="account_type"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormLabel>Account Type</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select account type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Cash">Cash</SelectItem>
									<SelectItem value="Bank">Bank</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="user_id"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormLabel>Assign To</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select admin" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{users?.map((user) => {
										return (
											<SelectItem key={user.id} value={user.id}>
												{`${user.first_name} ${user.last_name}`}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bank_name"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Bank Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ifsc_code"
					render={({ field }) => (
						<FormItem className="col-span-12 md:col-span-6">
							<FormLabel>IFSC Code</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="col-span-12 ">{children}</div>
			</form>
		</Form>
	);
}
