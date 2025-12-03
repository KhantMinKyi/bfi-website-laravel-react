'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddCategoryTagSettingProps {
    onSuccess?: () => void;
}

export function AddCategoryTagSetting({ onSuccess }: AddCategoryTagSettingProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        type: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            type: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/api/public_data/event_and_post/category-tag-settings', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Category & Tag Setting created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                // Convert validation errors to a single toast message
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Setting');
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
                    Add Category & Tag Setting
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Category & Tag Setting</DialogTitle>
                    <DialogDescription>
                        Create a new category & tag setting. Fill in the details below and click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                // required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 py-4">
                        <Label htmlFor="type">Type</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="category">Category</SelectItem>
                                <SelectItem value="tag">Tag</SelectItem>
                            </SelectContent>
                        </Select>
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
                            <Check />
                            {isSubmitting ? 'Saving...' : 'Save Setting'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
