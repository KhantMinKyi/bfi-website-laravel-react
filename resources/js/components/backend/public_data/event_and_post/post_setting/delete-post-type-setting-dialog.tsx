'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { PostSetting } from './post-type-setting-data-table';

interface DeletePostTypeSettingDialogProps {
    postSetting: PostSetting;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function DeletePostTypeSettingDialog({ postSetting, open, onOpenChange, onSuccess }: DeletePostTypeSettingDialogProps) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        router.delete(`/api/public_data/event_and_post/post-type-settings/${postSetting.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Setting deleted successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },

            onError: (errors) => {
                const msg = Object.values(errors).flat().join(' • ');
                toast.error(msg || 'Failed to delete setting');
            },

            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Delete Setting
                    </DialogTitle>
                    <DialogDescription>Are you sure you want to delete this setting? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                        <p className="font-medium">{postSetting.title}</p>
                        <p className="text-sm text-muted-foreground">Created at - {new Date(postSetting.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Updated at - {new Date(postSetting.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Setting'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
