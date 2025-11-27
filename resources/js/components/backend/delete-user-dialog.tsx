'use client';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { User } from './user-data-table';

interface DeleteUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({ user, open, onOpenChange }: DeleteUserDialogProps) {
    const handleDelete = () => {
        console.log('Deleting user:', user.id);
        // Here you would typically make an API call to delete the user
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>Are you sure you want to delete {user.name}? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4">
                        <div className="flex items-start gap-3">
                            <Trash2 className="mt-0.5 h-5 w-5 text-destructive" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">This will permanently delete:</p>
                                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                                    <li>User account: {user.email}</li>
                                    <li>All associated data</li>
                                    <li>User permissions and access</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete}>
                        Delete User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
