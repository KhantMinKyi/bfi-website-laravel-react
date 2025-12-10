'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SisterSchoolBanner } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateSisterSchoolBannerDialogProps {
    sisterSchoolBanners: SisterSchoolBanner[];
    open: boolean;
    sisterSchoolId: number;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

interface BannerFormData {
    id: string;
    banner_image: File | null;
    top_sub_title: string;
    title: string;
    bottom_sub_title: string;
    old_banner_image?: File | null;
    bannerPreview?: string;
    existingBannerUrl?: string;
}

export function UpdateSisterSchoolBannerDialog({
    sisterSchoolBanners,
    open,
    sisterSchoolId,
    onOpenChange,
    onSuccess,
}: UpdateSisterSchoolBannerDialogProps) {
    const [banners, setBanners] = React.useState<BannerFormData[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (open && sisterSchoolBanners && sisterSchoolBanners.length > 0) {
            setBanners(
                sisterSchoolBanners.map((banner) => ({
                    id: banner.id,
                    banner_image: null,
                    old_banner_image: banner.banner_image,
                    top_sub_title: banner.top_sub_title,
                    title: banner.title,
                    bottom_sub_title: banner.bottom_sub_title,
                    bannerPreview: banner.bannerPreview,
                    existingBannerUrl: banner.bannerPreview,
                })),
            );
        }
    }, [open, sisterSchoolBanners]);

    const handleAddBanner = () => {
        setBanners([
            ...banners,
            {
                id: `new-${Date.now()}`,
                banner_image: null,
                top_sub_title: '',
                title: '',
                bottom_sub_title: '',
                bannerPreview: undefined,
            },
        ]);
    };

    const handleRemoveBanner = (index: number) => {
        setBanners(banners.filter((_, i) => i !== index));
    };

    const handleBannerChange = (index: number, field: keyof BannerFormData, value: string) => {
        const updatedBanners = [...banners];
        updatedBanners[index] = { ...updatedBanners[index], [field]: value };
        setBanners(updatedBanners);
    };

    const handleBannerImageChange = (index: number, file: File | null) => {
        const updatedBanners = [...banners];
        updatedBanners[index] = { ...updatedBanners[index], banner_image: file };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedBanners[index] = { ...updatedBanners[index], bannerPreview: reader.result as string };
                setBanners([...updatedBanners]);
            };
            reader.readAsDataURL(file);
        } else {
            updatedBanners[index] = { ...updatedBanners[index], bannerPreview: updatedBanners[index].existingBannerUrl };
            setBanners([...updatedBanners]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        banners.forEach((banner, index) => {
            submitData.append(`sister_school_banner[${index}][id]`, banner.id);
            submitData.append(`sister_school_banner[${index}][top_sub_title]`, banner.top_sub_title);
            submitData.append(`sister_school_banner[${index}][title]`, banner.title);
            submitData.append(`sister_school_banner[${index}][bottom_sub_title]`, banner.bottom_sub_title);

            if (banner.banner_image) {
                submitData.append(`sister_school_banner[${index}][banner_image]`, banner.banner_image);
            }
        });

        submitData.append('_method', 'PUT');

        router.post(`/api/sister_schools/sister-schools/${sisterSchoolId}/banners`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sister School Banners updated successfully!');
                if (onSuccess) {
                    onSuccess();
                }
                onOpenChange(false);
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Sister School Banners');
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
                    <DialogTitle>Update Sister School Banners</DialogTitle>
                    <DialogDescription>Update the sister school banner details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Sister School Banners</Label>
                                <Button type="button" onClick={handleAddBanner} variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                    Add Banner
                                </Button>
                            </div>

                            {banners.length === 0 && (
                                <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                                    No banners added yet. Click "Add Banner" to create one.
                                </div>
                            )}

                            {banners.map((banner, index) => (
                                <div key={banner.id} className="relative rounded-lg border p-4">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => handleRemoveBanner(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                    <div className="grid gap-4 pr-8">
                                        <h4 className="font-medium">Banner {index + 1}</h4>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`banner-image-${index}`}>
                                                Banner Image <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`banner-image-${index}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleBannerImageChange(index, e.target.files?.[0] || null)}
                                            />
                                            {banner.bannerPreview ? (
                                                <div className="mt-2">
                                                    <img
                                                        src={banner.bannerPreview || '/placeholder.svg'}
                                                        alt="Banner preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {banner.banner_image ? 'New image selected' : 'Current banner image'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <img
                                                        src={String(banner.old_banner_image)}
                                                        alt="Banner preview"
                                                        className="h-32 w-auto rounded-md object-cover"
                                                    />
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {banner.banner_image ? 'New image selected' : 'Current banner image'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`top-sub-title-${index}`}>Top Sub Title</Label>
                                            <Input
                                                id={`top-sub-title-${index}`}
                                                placeholder="Enter top sub title"
                                                value={banner.top_sub_title}
                                                onChange={(e) => handleBannerChange(index, 'top_sub_title', e.target.value)}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`title-${index}`}>
                                                Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id={`title-${index}`}
                                                placeholder="Enter title"
                                                value={banner.title}
                                                onChange={(e) => handleBannerChange(index, 'title', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor={`bottom-sub-title-${index}`}>Bottom Sub Title</Label>
                                            <Input
                                                id={`bottom-sub-title-${index}`}
                                                placeholder="Enter bottom sub title"
                                                value={banner.bottom_sub_title}
                                                onChange={(e) => handleBannerChange(index, 'bottom_sub_title', e.target.value)}
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
