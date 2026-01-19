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

interface Alumni {
    id: string | number;
    title: string;
    banner?: string;
    introduction: string;
    body?: string;
    footer?: string;
    website_url?: string;
}

interface UpdateAlumniDialogProps {
    alumni: Alumni;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateAlumniDialog({ alumni, open, onOpenChange, onSuccess }: UpdateAlumniDialogProps) {
    const [formData, setFormData] = React.useState({
        title: alumni.title,
        banner: null as File | null,
        introduction: alumni.introduction,
        body: alumni.body,
        footer: alumni.footer,
        website_url: alumni.website_url,
    });

    const [bannerPreview, setBannerPreview] = React.useState<string>(alumni.banner || '');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

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
            setBannerPreview(alumni.banner || '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('title', formData.title);
        submitData.append('introduction', formData.introduction);
        if (formData.body) {
            submitData.append('body', formData.body);
        }
        if (formData.footer) {
            submitData.append('footer', formData.footer);
        }
        if (formData.website_url) {
            submitData.append('website_url', formData.website_url);
        }
        if (formData.banner) {
            submitData.append('banner', formData.banner);
        }

        router.post(`/api/public_data/alumni/${alumni.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Alumni Data updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Alumni data');
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
                    <DialogTitle>Update Alumni</DialogTitle>
                    <DialogDescription>Update the Alumni details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter  title"
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
                            <div className="gap-2">
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
                            {isSubmitting ? 'Updating...' : 'Update Alumni'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
