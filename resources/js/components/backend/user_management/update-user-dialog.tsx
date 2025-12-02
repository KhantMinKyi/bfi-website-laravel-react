'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
import type { User } from './user-data-table';

interface UpdateUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateUserDialog({ user, open, onOpenChange, onSuccess }: UpdateUserDialogProps) {
    const [formData, setFormData] = React.useState({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar || '',
        phone: user.phone,
        gender: user.gender,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when user prop changes
    React.useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar || '',
                phone: user.phone,
                gender: user.gender,
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/api/user-management/users/${user.id}`, formData, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('User updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },

            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update user');
            },

            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>Update user information. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update-name">Full Name</Label>
                            <Input
                                id="update-name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update-username">Username</Label>
                            <Input
                                id="update-username"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                                placeholder="https://example.com/avatar.jpg"
                                value={formData.avatar}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update-phone">Phone Number</Label>
                            <Input
                                id="update-phone"
                                placeholder="+959"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update-gender">Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                                <SelectTrigger id="update-gender">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="cursor-pointer gap-2 bg-red-500 text-white hover:bg-red-700"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
