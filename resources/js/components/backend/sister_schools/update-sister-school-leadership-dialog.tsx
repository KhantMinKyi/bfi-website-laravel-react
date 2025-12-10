'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SisterSchoolLeadership } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateSisterSchoolLeadershipDialogProps {
    sisterSchoolLeaderships: SisterSchoolLeadership[];
    open: boolean;
    sisterSchoolId: number;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

interface LeadershipFormData {
    id: string;
    image: File | null;
    name: string;
    position: string;
    old_image?: File | null;
    leadershipImagePreview?: string;
    existingImageUrl?: string;
}

export function UpdateSisterSchoolLeadershipDialog({
    sisterSchoolLeaderships,
    sisterSchoolId,
    open,
    onOpenChange,
    onSuccess,
}: UpdateSisterSchoolLeadershipDialogProps) {
    const [leaderships, setLeaderships] = React.useState<LeadershipFormData[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (open && sisterSchoolLeaderships && sisterSchoolLeaderships.length > 0) {
            setLeaderships(
                sisterSchoolLeaderships.map((leadership) => ({
                    id: leadership.id,
                    image: null,
                    old_image: leadership.image,
                    name: leadership.name,
                    position: leadership.position,
                    leadershipImagePreview: leadership.leadershipImagePreview,
                    existingImageUrl: leadership.leadershipImagePreview,
                })),
            );
        }
    }, [open, sisterSchoolLeaderships]);

    const handleAddLeadership = () => {
        setLeaderships([
            ...leaderships,
            {
                id: `new-${Date.now()}`,
                image: null,
                position: '',
                name: '',
                leadershipImagePreview: undefined,
            },
        ]);
    };

    const handleRemoveLeadership = (index: number) => {
        setLeaderships(leaderships.filter((_, i) => i !== index));
    };

    const handleLeadershipChange = (index: number, field: keyof LeadershipFormData, value: string) => {
        const updatedLeaderships = [...leaderships];
        updatedLeaderships[index] = { ...updatedLeaderships[index], [field]: value };
        setLeaderships(updatedLeaderships);
    };

    const handleLeadershipImageChange = (index: number, file: File | null) => {
        const updatedLeaderships = [...leaderships];
        updatedLeaderships[index] = { ...updatedLeaderships[index], image: file };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedLeaderships[index] = { ...updatedLeaderships[index], leadershipImagePreview: reader.result as string };
                setLeaderships([...updatedLeaderships]);
            };
            reader.readAsDataURL(file);
        } else {
            updatedLeaderships[index] = { ...updatedLeaderships[index], leadershipImagePreview: updatedLeaderships[index].existingImageUrl };
            setLeaderships([...updatedLeaderships]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        leaderships.forEach((leadership, index) => {
            submitData.append(`sister_school_leadership[${index}][id]`, leadership.id);
            submitData.append(`sister_school_leadership[${index}][position]`, leadership.position);
            submitData.append(`sister_school_leadership[${index}][name]`, leadership.name);

            if (leadership.image) {
                submitData.append(`sister_school_leadership[${index}][image]`, leadership.image);
            }
        });

        submitData.append('_method', 'PUT');

        router.post(`/api/sister_schools/sister-schools/${sisterSchoolId}/leaderships`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sister School Leaderships updated successfully!');
                if (onSuccess) {
                    onSuccess();
                }
                onOpenChange(false);
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Sister School Leaderships');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleCancel = () => {
        setIsSubmitting(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Update Sister School Leaderships</DialogTitle>
                    <DialogDescription>Update the sister school leadership details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Sister School Leaderships</Label>
                                <Button type="button" onClick={handleAddLeadership} variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                    Add Leadership
                                </Button>
                            </div>

                            {leaderships.length === 0 && (
                                <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                                    No Leaderships added yet. Click "Add Leadership" to create one.
                                </div>
                            )}

                            {leaderships.map((leadership, index) => (
                                <div key={leadership.id} className="relative rounded-lg border p-4">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => handleRemoveLeadership(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                    <div className="grid gap-4 pr-8">
                                        <h4 className="font-medium">Leadership {index + 1}</h4>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`image-${index}`}>
                                                Image <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`image-${index}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleLeadershipImageChange(index, e.target.files?.[0] || null)}
                                            />
                                            {leadership.leadershipImagePreview ? (
                                                <div className="mt-2">
                                                    <img
                                                        src={leadership.leadershipImagePreview || '/placeholder.svg'}
                                                        alt="Leadership preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {leadership.image ? 'New Image selected' : 'Current Image'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <img
                                                        src={String(leadership.old_image)}
                                                        alt="Leadership preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {leadership.image ? 'New image selected' : 'Current Image'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`name-${index}`}>
                                                Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`name-${index}`}
                                                placeholder="Enter name"
                                                value={leadership.name}
                                                onChange={(e) => handleLeadershipChange(index, 'name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`position-${index}`}>Position</Label>
                                            <Input
                                                id={`position-${index}`}
                                                placeholder="Enter Position"
                                                value={leadership.position}
                                                onChange={(e) => handleLeadershipChange(index, 'position', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
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
