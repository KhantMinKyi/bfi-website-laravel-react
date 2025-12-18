'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CompetitionPhoto } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddCompetitionProps {
    onSuccess?: () => void;
}

export function AddCompetition({ onSuccess }: AddCompetitionProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        slug: '',
        banner: null as File | null,
        introduction: '',
        body: '',
        footer: '',
    });

    const [bannerPreview, setBannerPreview] = React.useState<string>('');
    const [competitionPhotos, setCompetitionPhotos] = React.useState<CompetitionPhoto[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            banner: null,
            introduction: '',
            body: '',
            footer: '',
        });
        setCompetitionPhotos([]);
        setBannerPreview('');
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, banner: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setBannerPreview('');
        }
    };

    const handleAddCompetitionPhoto = () => {
        const newCompetitionPhoto: CompetitionPhoto = {
            id: `competition-${Date.now()}`,
            image: null,
            title: '',
        };
        setCompetitionPhotos([...competitionPhotos, newCompetitionPhoto]);
    };
    const handleRemoveCompetitionPhoto = (id: string) => {
        setCompetitionPhotos(competitionPhotos.filter((competitionPhoto) => competitionPhoto.id !== id));
    };

    const handleCompetitionPhotoChange = (id: string, field: keyof CompetitionPhoto, value: string | File | null) => {
        setCompetitionPhotos(
            competitionPhotos.map((competitionPhoto) => {
                if (competitionPhoto.id === id) {
                    const updatedCompetitionPhoto = { ...competitionPhoto, [field]: value };

                    // Handle image previews
                    if (field === 'image' && value instanceof File) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setCompetitionPhotos((prev) =>
                                prev.map((b) => (b.id === id ? { ...b, competitionPhotoPreview: reader.result as string } : b)),
                            );
                        };
                        reader.readAsDataURL(value);
                    }

                    return updatedCompetitionPhoto;
                }
                return competitionPhoto;
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('name', formData.name);
        submitData.append('slug', formData.slug);
        submitData.append('introduction', formData.introduction);
        submitData.append('body', formData.body);
        submitData.append('footer', formData.footer);

        if (formData.banner) {
            submitData.append('banner', formData.banner);
        }

        competitionPhotos.forEach((competitionPhoto, index) => {
            if (competitionPhoto.image) {
                submitData.append(`competition_photo[${index}][image]`, competitionPhoto.image);
            }
            submitData.append(`competition_photo[${index}][title]`, competitionPhoto.title);
        });

        router.post('/api/public_data/competitions', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Competition created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Competition');
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
                    Add Competition
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New Competition</DialogTitle>
                    <DialogDescription>Create a new Competition. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">
                                    Slug <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="slug"
                                    placeholder="Enter slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="banner">
                                    Banner <span className="text-red-500">*</span>
                                </Label>
                                <Input id="banner" type="file" accept="image/*" onChange={handleBannerChange} />
                                {bannerPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={bannerPreview || '/placeholder.svg'}
                                            alt="Banner preview"
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Descriptions */}
                        <RichTextEditor
                            id="introduction"
                            label="Introduction"
                            value={formData.introduction}
                            onChange={(content) => setFormData({ ...formData, introduction: content })}
                        />

                        <RichTextEditor
                            id="body"
                            label="Body"
                            value={formData.body}
                            onChange={(content) => setFormData({ ...formData, body: content })}
                        />

                        <RichTextEditor
                            id="footer"
                            label="Footer (or) Extra Information"
                            value={formData.footer}
                            onChange={(content) => setFormData({ ...formData, footer: content })}
                        />

                        {/* Competition Photos Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Competition Photos</Label>
                                <Button type="button" onClick={handleAddCompetitionPhoto} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Competition Photo
                                </Button>
                            </div>

                            {competitionPhotos.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">
                                    No photo added yet. Click "Add Competition Photo" to create one.
                                </p>
                            )}

                            {competitionPhotos.map((competitionPhoto, index) => (
                                <div key={competitionPhoto.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Crriculum Photo {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveCompetitionPhoto(competitionPhoto.id)}
                                            size="sm"
                                            variant="destructive"
                                            className="gap-2"
                                        >
                                            <X className="h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`image-${competitionPhoto.id}`}>Photo</Label>
                                            <Input
                                                id={`image-${competitionPhoto.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleCompetitionPhotoChange(competitionPhoto.id, 'image', e.target.files?.[0] || null)
                                                }
                                            />
                                            {competitionPhoto.competitionPhotoPreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={competitionPhoto.competitionPhotoPreview || '/placeholder.svg'}
                                                        alt="Competition Photo preview"
                                                        className="h-40 w-full rounded border object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`title-${competitionPhoto.id}`}>Title</Label>
                                        <Input
                                            id={`title-${competitionPhoto.id}`}
                                            placeholder="Enter title"
                                            value={competitionPhoto.title}
                                            onChange={(e) => handleCompetitionPhotoChange(competitionPhoto.id, 'title', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            {isSubmitting ? 'Saving...' : 'Save Competition'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
