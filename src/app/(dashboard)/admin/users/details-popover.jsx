import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

export function UserDataTableCellContent({ user }) {
	const fullName =
		`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A';

	const popoverContent = (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">User Details</h4>
				<p className="text-sm text-muted-foreground">
					ID: {user.id}
					<br />
					Email: {user.email || 'N/A'}
					<br />
					Phone: {user.contact_number || 'N/A'}
					<br />
					Type: {user?.user_type || 'N/A'}
					<br />
					Status: {user.is_active === '1' ? 'Active' : 'Inactive'}
				</p>
			</div>
			{user.address && (
				<div className="space-y-2">
					<h4 className="font-medium leading-none">Address</h4>
					<p className="text-sm text-muted-foreground">
						{user.address}
						<br />
						{user.city}, {user.state}, {user.country}
						<br />
						Pincode: {user.pincode || 'N/A'}
					</p>
				</div>
			)}
			{user.role && user.role.name && (
				<div className="space-y-2">
					<h4 className="font-medium leading-none">Role</h4>
					<p className="text-sm text-muted-foreground">
						{user.role.name}
						<br />
						Description: {user.role.description || 'N/A'}
					</p>
				</div>
			)}
		</div>
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link" className="p-0 h-auto font-normal">
					{fullName}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">{popoverContent}</PopoverContent>
		</Popover>
	);
}
