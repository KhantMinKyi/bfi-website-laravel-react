'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import { Check, Pencil } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface Curriculum {
    id: string | number;
    name: string;
    sub_title: string;
    slug: string;
    logo?: string;
    secondary_logo?: string;
    introduction: string;
    body?: string;
    footer?: string;
}

interface UpdateCurriculumDialogProps {
    curriculum: Curriculum;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateCurriculumDialog({ curriculum, open, onOpenChange, onSuccess }: UpdateCurriculumDialogProps) {
    const [formData, setFormData] = React.useState({
        name: curriculum.name,
        sub_title: curriculum.sub_title,
        slug: curriculum.slug,
        logo: null as File | null,
        secondary_logo: null as File | null,
        introduction: curriculum.introduction,
        body: curriculum.body,
        footer: curriculum.footer,
    });

    const [logoPreview, setLogoPreview] = React.useState<string>(curriculum.logo || '');
    const [secondaryLogoPreview, setSecondaryLogoPreview] = React.useState<string>(curriculum.secondary_logo || '');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

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
            setLogoPreview(curriculum.logo || '');
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
            setSecondaryLogoPreview(curriculum.secondary_logo || '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('name', formData.name);
        submitData.append('sub_title', formData.sub_title);
        submitData.append('slug', formData.slug);
        submitData.append('introduction', formData.introduction);
        if (formData.body) {
            submitData.append('body', formData.body);
        }
        if (formData.footer) {
            submitData.append('footer', formData.footer);
        }
        if (formData.logo) {
            submitData.append('logo', formData.logo);
        }
        if (formData.secondary_logo) {
            submitData.append('secondary_logo', formData.secondary_logo);
        }

        router.post(`/api/education/curriculum/${curriculum.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Academic updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Academic');
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
                    <DialogTitle>Update Academic</DialogTitle>
                    <DialogDescription>Update the Academic details below and click save when you're done.</DialogDescription>
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
                                <Label htmlFor="sub_title">
                                    Sub Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="sub_title"
                                    placeholder="Enter Sub Title"
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
                                    disabled
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                                <span className="mx-2 text-xs text-gray-500 dark:text-gray-500">Cannot edit Slug after creating data</span>
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
                                <Label htmlFor="secondary_logo">Secondary Logo</Label>
                                <Input id="secondary_logo" type="file" accept="image/*" onChange={handleSecondaryLogoChange} />
                                {secondaryLogoPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={secondaryLogoPreview || '/placeholder.svg'}
                                            alt="Secondary Logo preview"
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
                            value={formData.body || ''}
                            onChange={(content) => setFormData({ ...formData, body: content })}
                        />

                        <RichTextEditor
                            id="footer"
                            label="Footer"
                            value={formData.footer || ''}
                            onChange={(content) => setFormData({ ...formData, footer: content })}
                        />
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
                            {isSubmitting ? 'Updating...' : 'Update Academic'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
