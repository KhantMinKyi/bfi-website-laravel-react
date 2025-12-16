'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CurriculumPhoto } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddCurriculumProps {
    onSuccess?: () => void;
}

export function AddCurriculum({ onSuccess }: AddCurriculumProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        sub_title: '',
        slug: '',
        logo: null as File | null,
        secondary_logo: null as File | null,
        introduction: '',
        body: '',
        footer: '',
    });

    const [logoPreview, setLogoPreview] = React.useState<string>('');
    const [secondaryLogoPreview, setSecondaryLogoPreview] = React.useState<string>('');
    const [curriculumPhotos, setCurriculumPhotos] = React.useState<CurriculumPhoto[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            name: '',
            sub_title: '',
            slug: '',
            logo: null,
            secondary_logo: null,
            introduction: '',
            body: '',
            footer: '',
        });
        setCurriculumPhotos([]);
        setLogoPreview('');
        setSecondaryLogoPreview('');
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, logo: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoPreview('');
        }
    };

    const handleSecondaryLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, secondary_logo: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSecondaryLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSecondaryLogoPreview('');
        }
    };

    const handleAddCurriculumPhoto = () => {
        const newCurriculumPhoto: CurriculumPhoto = {
            id: `curriculum-${Date.now()}`,
            image: null,
            title: '',
        };
        setCurriculumPhotos([...curriculumPhotos, newCurriculumPhoto]);
    };
    const handleRemoveCurriculumPhoto = (id: string) => {
        setCurriculumPhotos(curriculumPhotos.filter((curriculumPhoto) => curriculumPhoto.id !== id));
    };

    const handleCurriculumPhotoChange = (id: string, field: keyof CurriculumPhoto, value: string | File | null) => {
        setCurriculumPhotos(
            curriculumPhotos.map((curriculumPhoto) => {
                if (curriculumPhoto.id === id) {
                    const updatedCurriculumPhoto = { ...curriculumPhoto, [field]: value };

                    // Handle image previews
                    if (field === 'image' && value instanceof File) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setCurriculumPhotos((prev) =>
                                prev.map((b) => (b.id === id ? { ...b, curriculumPhotoPreview: reader.result as string } : b)),
                            );
                        };
                        reader.readAsDataURL(value);
                    }

                    return updatedCurriculumPhoto;
                }
                return curriculumPhoto;
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('name', formData.name);
        submitData.append('sub_title', formData.sub_title);
        submitData.append('slug', formData.slug);
        submitData.append('introduction', formData.introduction);
        submitData.append('body', formData.body);
        submitData.append('footer', formData.footer);

        if (formData.logo) {
            submitData.append('logo', formData.logo);
        }
        if (formData.secondary_logo) {
            submitData.append('secondary_logo', formData.secondary_logo);
        }

        curriculumPhotos.forEach((curriculumPhoto, index) => {
            if (curriculumPhoto.image) {
                submitData.append(`curriculum_photo[${index}][image]`, curriculumPhoto.image);
            }
            submitData.append(`curriculum_photo[${index}][title]`, curriculumPhoto.title);
        });

        router.post('/api/education/curriculum', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Curriculum created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Curriculum');
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
                    Add Curriculum
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New Curriculum</DialogTitle>
                    <DialogDescription>Create a new Curriculum. Fill in the details below and click save when you're done.</DialogDescription>
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
                                    placeholder="Enter school name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="short_name">
                                    Sub Title<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="short_name"
                                    placeholder="Enter short name"
                                    value={formData.sub_title}
                                    onChange={(e) => setFormData({ ...formData, sub_title: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
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

                        {/* Logos */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="logo">
                                    Logo <span className="text-red-500">*</span>
                                </Label>
                                <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
                                {logoPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={logoPreview || '/placeholder.svg'}
                                            alt="Logo preview"
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="logo_b">Secondary Logo</Label>
                                <Input id="logo_b" type="file" accept="image/*" onChange={handleSecondaryLogoChange} />
                                {secondaryLogoPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={secondaryLogoPreview || '/placeholder.svg'}
                                            alt="Logo B preview"
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
                            label="Footer"
                            value={formData.footer}
                            onChange={(content) => setFormData({ ...formData, footer: content })}
                        />

                        {/* Curriculum Photos Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Curriculum Photos</Label>
                                <Button type="button" onClick={handleAddCurriculumPhoto} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Curriculum Photo
                                </Button>
                            </div>

                            {curriculumPhotos.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">
                                    No photo added yet. Click "Add Curriculum Photo" to create one.
                                </p>
                            )}

                            {curriculumPhotos.map((curriculumPhoto, index) => (
                                <div key={curriculumPhoto.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Crriculum Photo {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveCurriculumPhoto(curriculumPhoto.id)}
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
                                            <Label htmlFor={`image-${curriculumPhoto.id}`}>Photo</Label>
                                            <Input
                                                id={`image-${curriculumPhoto.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleCurriculumPhotoChange(curriculumPhoto.id, 'image', e.target.files?.[0] || null)
                                                }
                                            />
                                            {curriculumPhoto.curriculumPhotoPreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={curriculumPhoto.curriculumPhotoPreview || '/placeholder.svg'}
                                                        alt="Curriculum Photo preview"
                                                        className="h-40 w-full rounded border object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`title-${curriculumPhoto.id}`}>Title</Label>
                                        <Input
                                            id={`title-${curriculumPhoto.id}`}
                                            placeholder="Enter title"
                                            value={curriculumPhoto.title}
                                            onChange={(e) => handleCurriculumPhotoChange(curriculumPhoto.id, 'title', e.target.value)}
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
                            {isSubmitting ? 'Saving...' : 'Save Curriculum'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
