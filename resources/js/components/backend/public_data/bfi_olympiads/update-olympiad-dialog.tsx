'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BfiOlympiad } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Pencil } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateBfiOlympiadDialogProps {
    bfiOlympiad: BfiOlympiad;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateBfiOlympiadDialog({ bfiOlympiad, open, onOpenChange, onSuccess }: UpdateBfiOlympiadDialogProps) {
    const [formData, setFormData] = React.useState({
        title: bfiOlympiad.title,
        information: bfiOlympiad.information,
        date: bfiOlympiad.date,
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('title', formData.title);
        submitData.append('information', formData.information);
        if (formData.date) {
            submitData.append('date', formData.date);
        }

        router.post(`/api/public_data/bfi_olympiads/${bfiOlympiad.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('BFI Olympiad updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update BFI Olympiad');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="cursor-pointer gap-2 bg-transparent">
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Update BFI Olympiad</DialogTitle>
                    <DialogDescription>Update the BFI Olympiad details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="information">
                                    Information <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="information"
                                    placeholder="Enter information"
                                    value={formData.information}
                                    onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    placeholder="Enter date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    type="date"
                                />
                            </div>
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
                            {isSubmitting ? 'Updating...' : 'Update BFI Olympiad'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
