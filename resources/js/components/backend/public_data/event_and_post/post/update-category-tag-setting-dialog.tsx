'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { CategoryTag } from '@/types';

interface UpdateCategoryTagSettingDialogProps {
    categoryTag: CategoryTag;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateCategoryTagSettingDialog({ categoryTag, open, onOpenChange, onSuccess }: UpdateCategoryTagSettingDialogProps) {
    const [formData, setFormData] = React.useState({
        title: categoryTag.title,
        type: categoryTag.type,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when categoryTag prop changes
    React.useEffect(() => {
        if (categoryTag) {
            setFormData({
                title: categoryTag.title,
                type: categoryTag.type,
            });
        }
    }, [categoryTag]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/api/public_data/event_and_post/category-tag-settings/${categoryTag.id}`, formData, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Category & Tag Setting updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },

            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Setting');
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
                    <DialogTitle>Update Setting</DialogTitle>
                    <DialogDescription>Update Setting information. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update-title">Title</Label>
                            <Input
                                id="update-title"
                                placeholder="John Doe"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 py-4">
                        <Label htmlFor="update-type">Type</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                            <SelectTrigger id="update-type">
                                <SelectValue placeholder="Select type" />
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
                            onClick={() => onOpenChange(false)}
                            className="cursor-pointer gap-2 bg-red-500 text-white hover:bg-red-700"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                            <Check />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
