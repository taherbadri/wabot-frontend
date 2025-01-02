import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import {
	BanknoteIcon as Bank,
	CreditCard,
	Calendar,
	MoreHorizontal,
} from 'lucide-react';

export function AccountDetailsPopover({ account, children }) {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-80">
				<Card>
					<CardHeader>
						<CardTitle>
							{account.account_name} - ({account.account_type} Account)
						</CardTitle>
						<CardDescription>assigned to</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-4 mb-4">
							<Avatar className="h-12 w-12">
								<AvatarFallback>
									{account.user.first_name[0]}
									{account.user.last_name[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm font-medium">
									{account.user.first_name} {account.user.last_name}
								</p>
								<p className="text-sm text-muted-foreground">
									{account.user.email}
								</p>
							</div>
						</div>
						<div className="space-y-2">
							{account?.bank_name && (
								<div className="flex items-center">
									<Bank className="mr-2 h-4 w-4" />
									<span className="text-sm">{account.bank_name}</span>
								</div>
							)}
							{account?.account_number && (
								<div className="flex items-center">
									<CreditCard className="mr-2 h-4 w-4" />
									<span className="text-sm">A/C: {account.account_number}</span>
								</div>
							)}
							<div className="flex items-center">
								<Calendar className="mr-2 h-4 w-4" />
								<span className="text-sm">
									Created: {new Date(account.created_at).toLocaleDateString()}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
}

export function AccountDataTableCellContent({ account }) {
	return (
		<AccountDetailsPopover account={account}>
			<Button variant="link" className="p-0 h-auto font-normal">
				{account.account_name}
			</Button>
		</AccountDetailsPopover>
	);
}

export function ExpenseDataTableCellContent({ expense }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link" className="text-left font-normal">
					<span className="font-medium">{expense.category.category_name}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="space-y-2">
					<h4 className="text-sm font-semibold">
						{expense.category.category_name}
					</h4>
					<div className="text-sm space-y-1">
						<div className="flex justify-between">
							<Label>Amount:</Label>
							<span>
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: expense.currency,
								}).format(parseFloat(expense.amount))}
							</span>
						</div>
						<div className="flex justify-between">
							<Label>Date:</Label>
							<span>{new Date(expense.expense_date).toLocaleDateString()}</span>
						</div>
						<div className="flex justify-between">
							<Label>Vendor:</Label>
							<span>{expense.vendor_name || 'N/A'}</span>
						</div>
						<div className="flex justify-between">
							<Label>Invoice:</Label>
							<span>{expense.invoice_number || 'N/A'}</span>
						</div>
						<div className="flex justify-between">
							<Label>Recurring:</Label>
							<span>{expense.is_recurring === '1' ? 'Yes' : 'No'}</span>
						</div>
						<div className="flex justify-between">
							<Label>Created:</Label>
							<span>{new Date(expense.created_at).toLocaleString()}</span>
						</div>
					</div>
					{expense.description && (
						<div className="text-sm">
							<Label>Description:</Label>
							<p className="text-sm mt-1">{expense.description}</p>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export function TransactionDataTableCellContent({ transaction }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link" className="capitalize font-normal">
					<span className="font-medium">{transaction?.transaction_type}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="space-y-2">
					<h4 className="text-sm font-semibold">Transaction Details</h4>
					<div className="text-sm space-y-1">
						<div className="flex justify-between">
							<Label>ID:</Label>
							<span>{transaction?.id}</span>
						</div>
						<div className="flex justify-between">
							<Label>Type:</Label>
							<span className="capitalize">
								{transaction?.transaction_type}
							</span>
						</div>
						<div className="flex justify-between">
							<Label>Amount:</Label>
							<span>
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: transaction?.currency,
								}).format(parseFloat(transaction?.amount))}
							</span>
						</div>
						<div className="flex justify-between">
							<Label>Date:</Label>
							<span>
								{new Date(transaction?.transaction_date).toLocaleDateString()}
							</span>
						</div>
						<div className="flex justify-between">
							<Label>Account:</Label>
							<span>{transaction?.account_details.account_name}</span>
						</div>
						<div className="flex justify-between">
							<Label>Item:</Label>
							<span>{transaction?.reference_details?.item_name || 'N/A'}</span>
						</div>
						<div className="flex justify-between">
							<Label>Created By:</Label>
							<span>{`${transaction?.created_by_details.first_name} ${transaction?.created_by_details.last_name}`}</span>
						</div>
						<div className="flex justify-between">
							<Label>Created At:</Label>
							<span>{new Date(transaction?.created_at).toLocaleString()}</span>
						</div>
					</div>
					{transaction?.description && (
						<div className="text-sm">
							<Label>Description:</Label>
							<p className="text-sm mt-1">{transaction?.description}</p>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
