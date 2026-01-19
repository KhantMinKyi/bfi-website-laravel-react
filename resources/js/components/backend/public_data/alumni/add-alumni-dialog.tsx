'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlumniPhoto } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddAlumniProps {
    onSuccess?: () => void;
}

export function AddAlumni({ onSuccess }: AddAlumniProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        banner: null as File | null,
        introduction: '',
        body: '',
        footer: '',
        website_url: '',
    });

    const [bannerPreview, setBannerPreview] = React.useState<string>('');
    const [alumniPhotos, setAlumniPhotos] = React.useState<AlumniPhoto[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            banner: null,
            introduction: '',
            body: '',
            footer: '',
            website_url: '',
        });
        setAlumniPhotos([]);
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

    const handleAddAlumniPhoto = () => {
        const newAlumniPhoto: AlumniPhoto = {
            id: `alumni-${Date.now()}`,
            image: null,
            title: '',
        };
        setAlumniPhotos([...alumniPhotos, newAlumniPhoto]);
    };
    const handleRemoveAlumniPhoto = (id: string) => {
        setAlumniPhotos(alumniPhotos.filter((alumniPhoto) => alumniPhoto.id !== id));
    };

    const handleAlumniPhotoChange = (id: string, field: keyof AlumniPhoto, value: string | File | null) => {
        setAlumniPhotos(
            alumniPhotos.map((alumniPhoto) => {
                if (alumniPhoto.id === id) {
                    const updatedAlumniPhoto = { ...alumniPhoto, [field]: value };

                    // Handle image previews
                    if (field === 'image' && value instanceof File) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setAlumniPhotos((prev) => prev.map((b) => (b.id === id ? { ...b, alumniPhotoPreview: reader.result as string } : b)));
                        };
                        reader.readAsDataURL(value);
                    }

                    return updatedAlumniPhoto;
                }
                return alumniPhoto;
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('title', formData.title);
        submitData.append('introduction', formData.introduction);
        submitData.append('body', formData.body);
        submitData.append('footer', formData.footer);
        submitData.append('website_url', formData.website_url);

        if (formData.banner) {
            submitData.append('banner', formData.banner);
        }

        alumniPhotos.forEach((alumniPhoto, index) => {
            if (alumniPhoto.image) {
                submitData.append(`alumni_photo[${index}][image]`, alumniPhoto.image);
            }
            submitData.append(`alumni_photo[${index}][title]`, alumniPhoto.title);
        });

        router.post('/api/public_data/alumni', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Alumni Data created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Alumni Data');
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
                    Add Alumni
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New Alumni</DialogTitle>
                    <DialogDescription>Create a new Alumni. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Name"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="grid grid-cols-2 gap-4">
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
                            <div className="grid gap-2">
                                <Label htmlFor="website_url">Website Url</Label>
                                <Input
                                    id="website_url"
                                    placeholder="Enter Website Url"
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                />
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

                        {/* Alumni Photos Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Alumni Photos</Label>
                                <Button type="button" onClick={handleAddAlumniPhoto} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Alumni Photo
                                </Button>
                            </div>

                            {alumniPhotos.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">
                                    No photo added yet. Click "Add Alumni Photo" to create one.
                                </p>
                            )}

                            {alumniPhotos.map((alumniPhoto, index) => (
                                <div key={alumniPhoto.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Alumni Photo {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveAlumniPhoto(alumniPhoto.id)}
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
                                            <Label htmlFor={`image-${alumniPhoto.id}`}>Photo</Label>
                                            <Input
                                                id={`image-${alumniPhoto.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleAlumniPhotoChange(alumniPhoto.id, 'image', e.target.files?.[0] || null)}
                                            />
                                            {alumniPhoto.alumniPhotoPreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={alumniPhoto.alumniPhotoPreview || '/placeholder.svg'}
                                                        alt="Alumni Photo preview"
                                                        className="h-40 w-full rounded border object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`title-${alumniPhoto.id}`}>Title</Label>
                                        <Input
                                            id={`title-${alumniPhoto.id}`}
                                            placeholder="Enter title"
                                            value={alumniPhoto.title}
                                            onChange={(e) => handleAlumniPhotoChange(alumniPhoto.id, 'title', e.target.value)}
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
                            {isSubmitting ? 'Saving...' : 'Save Alumni'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
