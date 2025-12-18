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

interface Competition {
    id: string | number;
    name: string;
    slug: string;
    banner?: string;
    introduction: string;
    body?: string;
    footer?: string;
}

interface UpdateCompetitionDialogProps {
    competition: Competition;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateCompetitionDialog({ competition, open, onOpenChange, onSuccess }: UpdateCompetitionDialogProps) {
    const [formData, setFormData] = React.useState({
        name: competition.name,
        slug: competition.slug,
        banner: null as File | null,
        introduction: competition.introduction,
        body: competition.body,
        footer: competition.footer,
    });

    const [bannerPreview, setBannerPreview] = React.useState<string>(competition.banner || '');
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
            setBannerPreview(competition.banner || '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('name', formData.name);
        submitData.append('slug', formData.slug);
        submitData.append('introduction', formData.introduction);
        if (formData.body) {
            submitData.append('body', formData.body);
        }
        if (formData.footer) {
            submitData.append('footer', formData.footer);
        }
        if (formData.banner) {
            submitData.append('banner', formData.banner);
        }

        router.post(`/api/public_data/competitions/${competition.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Competition updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Competition');
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
                    <DialogTitle>Update Competition</DialogTitle>
                    <DialogDescription>Update the Competition details below and click save when you're done.</DialogDescription>
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
                            </div>
                            <span className="mx-2 text-right text-xs text-gray-500 dark:text-gray-500"></span>
                            <span className="mx-2 text-xs text-gray-500 dark:text-gray-500">Cannot edit Slug after creating data</span>
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
                            {isSubmitting ? 'Updating...' : 'Update Competition'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
