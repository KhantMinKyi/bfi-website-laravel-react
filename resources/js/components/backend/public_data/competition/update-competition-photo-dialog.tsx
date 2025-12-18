'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CompetitionPhoto } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateCompetitionPhotoDialogProps {
    competitionPhotos: CompetitionPhoto[];
    open: boolean;
    competitionId: number;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

interface CompetitionPhotosFormData {
    id: string;
    image: File | null;
    title: string;
    old_image?: File | null;
    competitionPhotoPreview?: string;
    existingImageUrl?: string;
}

export function UpdateCompetitionPhotoDialog({ competitionPhotos, open, competitionId, onOpenChange, onSuccess }: UpdateCompetitionPhotoDialogProps) {
    const [photos, setPhotos] = React.useState<CompetitionPhotosFormData[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (open && competitionPhotos && competitionPhotos.length > 0) {
            setPhotos(
                competitionPhotos.map((photo) => ({
                    id: photo.id,
                    image: null,
                    old_image: photo.image,
                    title: photo.title,
                    imagePreview: photo.competitionPhotoPreview,
                    existingPhotoUrl: photo.competitionPhotoPreview,
                })),
            );
        }
    }, [open, competitionPhotos]);

    const handleAddPhoto = () => {
        setPhotos([
            ...photos,
            {
                id: `new-${Date.now()}`,
                image: null,
                title: '',
                competitionPhotoPreview: undefined,
            },
        ]);
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleCompetitionPhotoChange = (index: number, field: keyof CompetitionPhotosFormData, value: string) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index] = { ...updatedPhotos[index], [field]: value };
        setPhotos(updatedPhotos);
    };

    const handlePhotoChange = (index: number, file: File | null) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index] = { ...updatedPhotos[index], image: file };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedPhotos[index] = { ...updatedPhotos[index], competitionPhotoPreview: reader.result as string };
                setPhotos([...updatedPhotos]);
            };
            reader.readAsDataURL(file);
        } else {
            updatedPhotos[index] = { ...updatedPhotos[index], competitionPhotoPreview: updatedPhotos[index].existingImageUrl };
            setPhotos([...updatedPhotos]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        photos.forEach((photo, index) => {
            submitData.append(`competition_photo[${index}][id]`, photo.id);
            submitData.append(`competition_photo[${index}][title]`, photo.title);
            if (photo.image) {
                submitData.append(`competition_photo[${index}][image]`, photo.image);
            }
        });

        submitData.append('_method', 'PUT');

        router.post(`/api/public_data/competitions/${competitionId}/photos`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Competition Photos updated successfully!');
                if (onSuccess) {
                    onSuccess();
                }
                onOpenChange(false);
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Competition Photos');
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
                    <DialogTitle>Update Competition Photoss</DialogTitle>
                    <DialogDescription>Update the Competition Photos details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Competition Photo</Label>
                                <Button type="button" onClick={handleAddPhoto} variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                    Add Photo
                                </Button>
                            </div>

                            {photos.length === 0 && (
                                <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                                    No photos added yet. Click "Add Photo" to create one.
                                </div>
                            )}

                            {photos.map((photo, index) => (
                                <div key={photo.id} className="relative rounded-lg border p-4">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => handleRemovePhoto(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                    <div className="grid gap-4 pr-8">
                                        <h4 className="font-medium">Photo {index + 1}</h4>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`image-${index}`}>
                                                Image <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`image-${index}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                                            />
                                            {photo.competitionPhotoPreview ? (
                                                <div className="mt-2">
                                                    <img
                                                        src={photo.competitionPhotoPreview || '/placeholder.svg'}
                                                        alt="photo preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {photo.image ? 'New image selected' : 'Current  image'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <img
                                                        src={String(photo.old_image)}
                                                        alt="Photo preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {photo.image ? 'New image selected' : 'Current  image'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`title-${index}`}>
                                                Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`title-${index}`}
                                                placeholder="Enter title"
                                                value={photo.title}
                                                onChange={(e) => handleCompetitionPhotoChange(index, 'title', e.target.value)}
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
