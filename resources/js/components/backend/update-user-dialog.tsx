'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from './user-data-table';

interface UpdateUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpdateUserDialog({ user, open, onOpenChange }: UpdateUserDialogProps) {
    const [formData, setFormData] = React.useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
    });

    React.useEffect(() => {
        if (open) {
            setFormData({
                name: user.name,
                email: user.email,
                avatar: user.avatar || '',
            });
        }
    }, [open, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updating user:', user.id, formData);
        // Here you would typically make an API call to update the user
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>Update user information. Make changes below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update-name">Name</Label>
                            <Input
                                id="update-name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update-email">Email</Label>
                            <Input
                                id="update-email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update-avatar">Avatar URL (Optional)</Label>
                            <Input
                                id="update-avatar"
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                value={formData.avatar}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
