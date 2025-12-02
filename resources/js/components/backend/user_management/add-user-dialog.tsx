'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddUserDialogProps {
    onSuccess?: () => void;
}

export function AddUserDialog({ onSuccess }: AddUserDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: '',
        phone: '',
        gender: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            name: '',
            username: '',
            email: '',
            password: '',
            avatar: '',
            phone: '',
            gender: '',
        });
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);

    //     try {
    //         const response = await fetch('/api/user-management/users', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw new Error(error.message || 'Failed to create user');
    //         }

    //         toast.success('User created successfully!');
    //         resetForm();
    //         setOpen(false);

    //         if (onSuccess) {
    //             onSuccess();
    //         }
    //     } catch (error) {
    //         toast.error(error instanceof Error ? error.message : 'Failed to create user');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/api/user-management/users', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('User created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                // Convert validation errors to a single toast message
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create user');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                            <Input
                                id="avatar"
                                placeholder="https://example.com/avatar.jpg"
                                value={formData.avatar}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="+959"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                                <SelectTrigger id="gender">
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
                            onClick={() => setOpen(false)}
                            className="cursor-pointer gap-2 bg-red-500 text-white hover:bg-red-700"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                            {isSubmitting ? 'Saving...' : 'Save User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
