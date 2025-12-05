'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PostSetting } from '@/types';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdatePostTypeSettingDialogProps {
    postSetting: PostSetting;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdatePostTypeSettingDialog({ postSetting, open, onOpenChange, onSuccess }: UpdatePostTypeSettingDialogProps) {
    const [formData, setFormData] = React.useState({
        title: postSetting.title,
        is_activity: postSetting.is_activity,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when postSetting prop changes
    React.useEffect(() => {
        if (postSetting) {
            setFormData({
                title: postSetting.title,
                is_activity: postSetting.is_activity,
            });
        }
    }, [postSetting]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/api/public_data/event_and_post/post-type-settings/${postSetting.id}`, formData, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Setting updated successfully!');
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
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update-is_activity">Is Include Date?</Label>
                            <Checkbox
                                id="update-is_activity"
                                checked={formData.is_activity ? true : false}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_activity: checked ? true : false })}
                            />
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
                            <Check />
                            {isSubmitting ? 'Updating...' : 'Update Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
