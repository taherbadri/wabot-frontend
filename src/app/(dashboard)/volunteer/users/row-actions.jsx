'use client';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { userActions } from '@/lib/features/user/userSlice';
import Link from 'next/link';

export function UserDataTableRowActions({ row }) {
	const pathName = usePathname();
	const userTypeToFetch = pathName.split('/').includes('users') ? '' : 'users';

	const dispatch = useAppDispatch();
	const user = row.original;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => console.log('View user details:', user)}
				>
					<Link href={`/volunteer/users/details?id=${user.id}`}>
						View details
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => console.log('Edit user:', user.id)}>
					Edit user
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log('Toggle user status:', user.id);
						dispatch(
							userActions({
								action: 'update-status',
								actionId: user.is_active === '1' ? 'deactivate' : 'activate',
								details: [user.id],
								filter: userTypeToFetch,
							})
						);
					}}
				>
					{user.is_active === '1' ? 'Deactivate' : 'Activate'} user
				</DropdownMenuItem>
				{user?.user_type !== 'super-admin' && user?.user_type !== 'admin' && (
					<DropdownMenuItem
						onClick={() => {
							console.log('Delete user:', user.id);
							dispatch(
								userActions({
									action: 'delete',
									details: [user.id],
									filter: userTypeToFetch,
								})
							);
						}}
					>
						Delete user
					</DropdownMenuItem>
				)}
				{user?.user_type !== 'super-admin' &&
					user?.user_type !== 'admin' &&
					user.is_locked === '0' && (
						<DropdownMenuItem
							onClick={() => console.log('Lock user:', user.id)}
						>
							Lock user
						</DropdownMenuItem>
					)}
				{user?.user_type !== 'super-admin' &&
					user?.user_type !== 'admin' &&
					user.is_locked === '1' && (
						<DropdownMenuItem
							onClick={() => console.log('Unlock user:', user.id)}
						>
							Unlock user
						</DropdownMenuItem>
					)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
