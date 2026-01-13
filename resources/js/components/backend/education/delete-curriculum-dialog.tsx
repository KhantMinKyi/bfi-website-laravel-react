'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Curriculum } from '@/types';

import { router } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface DeleteCurriculumDialogProps {
    curriculum: Curriculum;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function DeleteCurriculumDialog({ curriculum, open, onOpenChange, onSuccess }: DeleteCurriculumDialogProps) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        router.delete(`/api/education/curriculum/${curriculum.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Sister Curriculum deleted successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },

            onError: (errors) => {
                const msg = Object.values(errors).flat().join(' • ');
                toast.error(msg || 'Failed to delete Sister Curriculum');
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
                        Delete Academic
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this Academic? This action will change the Academic status to inactive.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                        <p className="font-medium">{curriculum.name}</p>
                        <p className="text-sm text-muted-foreground"> {curriculum.sub_title}</p>
                        {curriculum.created_user && <p className="text-sm text-muted-foreground">Created By - {curriculum.created_user.name}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Academic'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
