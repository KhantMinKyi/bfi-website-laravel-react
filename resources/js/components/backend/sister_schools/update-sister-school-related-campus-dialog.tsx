'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SisterSchoolRelatedCampus } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateSisterSchoolRelatedCampusDialogProps {
    sisterSchoolRelatedCampuses: SisterSchoolRelatedCampus[];
    open: boolean;
    sisterSchoolId: number;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

interface RelatedCampusFormData {
    id: string;
    image: File | null;
    campus_name: string;
    old_image?: File | null;
    relatedCampusImagePreview?: string;
    existingImageUrl?: string;
}

export function UpdateSisterSchoolRelatedCampusDialog({
    sisterSchoolRelatedCampuses,
    sisterSchoolId,
    open,
    onOpenChange,
    onSuccess,
}: UpdateSisterSchoolRelatedCampusDialogProps) {
    const [selectedRelatedCampuses, setSelatedRelatedCampuses] = React.useState<RelatedCampusFormData[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (open && sisterSchoolRelatedCampuses && sisterSchoolRelatedCampuses.length > 0) {
            setSelatedRelatedCampuses(
                sisterSchoolRelatedCampuses.map((relatedCampus) => ({
                    id: relatedCampus.id,
                    image: null,
                    old_image: relatedCampus.image,
                    campus_name: relatedCampus.campus_name,
                    relatedCampusImagePreview: relatedCampus.relatedCampusImagePreview,
                    existingImageUrl: relatedCampus.relatedCampusImagePreview,
                })),
            );
        }
    }, [open, sisterSchoolRelatedCampuses]);

    const handleAddRelatedCampus = () => {
        setSelatedRelatedCampuses([
            ...selectedRelatedCampuses,
            {
                id: `new-${Date.now()}`,
                image: null,
                campus_name: '',
                relatedCampusImagePreview: undefined,
            },
        ]);
    };

    const handleRemoveRelatedCampus = (index: number) => {
        setSelatedRelatedCampuses(selectedRelatedCampuses.filter((_, i) => i !== index));
    };

    const handleRelatedCampusChange = (index: number, field: keyof RelatedCampusFormData, value: string) => {
        const updatedselectedRelatedCampuses = [...selectedRelatedCampuses];
        updatedselectedRelatedCampuses[index] = { ...updatedselectedRelatedCampuses[index], [field]: value };
        setSelatedRelatedCampuses(updatedselectedRelatedCampuses);
    };

    const handleRelatedCampusImageChange = (index: number, file: File | null) => {
        const updatedselectedRelatedCampuses = [...selectedRelatedCampuses];
        updatedselectedRelatedCampuses[index] = { ...updatedselectedRelatedCampuses[index], image: file };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedselectedRelatedCampuses[index] = {
                    ...updatedselectedRelatedCampuses[index],
                    relatedCampusImagePreview: reader.result as string,
                };
                setSelatedRelatedCampuses([...updatedselectedRelatedCampuses]);
            };
            reader.readAsDataURL(file);
        } else {
            updatedselectedRelatedCampuses[index] = {
                ...updatedselectedRelatedCampuses[index],
                relatedCampusImagePreview: updatedselectedRelatedCampuses[index].existingImageUrl,
            };
            setSelatedRelatedCampuses([...updatedselectedRelatedCampuses]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        selectedRelatedCampuses.forEach((relatedCampus, index) => {
            submitData.append(`sister_school_related_campuses[${index}][id]`, relatedCampus.id);
            submitData.append(`sister_school_related_campuses[${index}][campus_name]`, relatedCampus.campus_name);

            if (relatedCampus.image) {
                submitData.append(`sister_school_related_campuses[${index}][image]`, relatedCampus.image);
            }
        });

        submitData.append('_method', 'PUT');

        router.post(`/api/sister_schools/sister-schools/${sisterSchoolId}/relatedCampuses`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sister School related Campuses updated successfully!');
                if (onSuccess) {
                    onSuccess();
                }
                onOpenChange(false);
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Sister School related Campuses');
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
                    <DialogTitle>Update Sister School related Campuses</DialogTitle>
                    <DialogDescription>Update the sister school related campus details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Sister School related Campuses</Label>
                                <Button type="button" onClick={handleAddRelatedCampus} variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                    Add Related Campus
                                </Button>
                            </div>

                            {selectedRelatedCampuses.length === 0 && (
                                <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                                    No related Campuses added yet. Click "Add Related Campus" to create one.
                                </div>
                            )}

                            {selectedRelatedCampuses.map((relatedCampus, index) => (
                                <div key={relatedCampus.id} className="relative rounded-lg border p-4">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => handleRemoveRelatedCampus(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                    <div className="grid gap-4 pr-8">
                                        <h4 className="font-medium">Related Campus {index + 1}</h4>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`image-${index}`}>
                                                Image <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`image-${index}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleRelatedCampusImageChange(index, e.target.files?.[0] || null)}
                                            />
                                            {relatedCampus.relatedCampusImagePreview ? (
                                                <div className="mt-2">
                                                    <img
                                                        src={relatedCampus.relatedCampusImagePreview || '/placeholder.svg'}
                                                        alt="Related Campus preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {relatedCampus.image ? 'New Image selected' : 'Current Image'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <img
                                                        src={String(relatedCampus.old_image)}
                                                        alt="Related Campus preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {relatedCampus.image ? 'New image selected' : 'Current Image'}
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
                                                value={relatedCampus.campus_name}
                                                onChange={(e) => handleRelatedCampusChange(index, 'campus_name', e.target.value)}
                                                required
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
