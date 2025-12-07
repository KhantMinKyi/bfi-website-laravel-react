'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import type { Post } from '@/types';

interface DeletePostDialogProps {
    post: Post;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function DeletePostDialog({ post, open, onOpenChange, onSuccess }: DeletePostDialogProps) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        // Status is always set to 0 (hidden from user, always inactive)
        const data = {
            status: 0,
        };

        router.post(`/api/public_data/event_and_post/posts/${post.id}/change-status`, data, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Post deleted successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },

            onError: (errors) => {
                const msg = Object.values(errors).flat().join(' • ');
                toast.error(msg || 'Failed to delete post');
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
                        Delete Post
                    </DialogTitle>
                    <DialogDescription>Are you sure you want to delete this post? This action will change the post status to inactive.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">Created by - {post.created_user.name}</p>
                        {post.updated_user && <p className="text-sm text-muted-foreground">Updated by - {post.updated_user.name}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Post'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
