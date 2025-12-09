'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SisterSchoolBanner, SisterSchoolLeadership } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddSisterSchoolProps {
    onSuccess?: () => void;
}

export function AddSisterSchool({ onSuccess }: AddSisterSchoolProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        short_name: '',
        slug: '',
        logo: null as File | null,
        logo_b: null as File | null,
        address: '',
        email: '',
        phone: '',
        website_url: '',
        introduction: '',
        description: '',
        hos_message: '',
        hos_image: null as File | null,
        hos_name: '',
    });

    const [logoPreview, setLogoPreview] = React.useState<string>('');
    const [logoBPreview, setLogoBPreview] = React.useState<string>('');
    const [hosImagePreview, setHosImagePreview] = React.useState<string>('');

    const [sisterSchoolBanners, setSisterSchoolBanners] = React.useState<SisterSchoolBanner[]>([]);
    const [sisterSchoolLeaderships, setSisterSchoolLeaderships] = React.useState<SisterSchoolLeadership[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            name: '',
            short_name: '',
            slug: '',
            logo: null,
            logo_b: null,
            address: '',
            email: '',
            phone: '',
            website_url: '',
            introduction: '',
            description: '',
            hos_message: '',
            hos_image: null,
            hos_name: '',
        });
        setSisterSchoolBanners([]);
        setSisterSchoolLeaderships([]);
        setLogoPreview('');
        setLogoBPreview('');
        setHosImagePreview('');
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

    const handleLogoBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, logo_b: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoBPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoBPreview('');
        }
    };

    const handleHosImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, hos_image: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHosImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setHosImagePreview('');
        }
    };

    const handleAddBanner = () => {
        const newBanner: SisterSchoolBanner = {
            id: `banner-${Date.now()}`,
            banner_image: null,
            top_sub_title: '',
            title: '',
            bottom_sub_title: '',
        };
        setSisterSchoolBanners([...sisterSchoolBanners, newBanner]);
    };
    const handleAddLeadership = () => {
        const newLeadership: SisterSchoolLeadership = {
            id: `banner-${Date.now()}`,
            image: null,
            name: '',
            position: '',
        };
        setSisterSchoolLeaderships([...sisterSchoolLeaderships, newLeadership]);
    };

    const handleRemoveBanner = (id: string) => {
        setSisterSchoolBanners(sisterSchoolBanners.filter((banner) => banner.id !== id));
    };
    const handleRemoveLeadership = (id: string) => {
        setSisterSchoolLeaderships(sisterSchoolLeaderships.filter((leadershipId) => leadershipId.id !== id));
    };

    const handleBannerChange = (id: string, field: keyof SisterSchoolBanner, value: string | File | null) => {
        setSisterSchoolBanners(
            sisterSchoolBanners.map((banner) => {
                if (banner.id === id) {
                    const updatedBanner = { ...banner, [field]: value };

                    // Handle image previews
                    if (field === 'banner_image' && value instanceof File) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setSisterSchoolBanners((prev) => prev.map((b) => (b.id === id ? { ...b, bannerPreview: reader.result as string } : b)));
                        };
                        reader.readAsDataURL(value);
                    }

                    return updatedBanner;
                }
                return banner;
            }),
        );
    };
    const handleLeadershipChange = (id: string, field: keyof SisterSchoolLeadership, value: string | File | null) => {
        setSisterSchoolLeaderships(
            sisterSchoolLeaderships.map((leadership) => {
                if (leadership.id === id) {
                    const updatedLeadership = { ...leadership, [field]: value };

                    // Handle image previews
                    if (field === 'image' && value instanceof File) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setSisterSchoolLeaderships((prev) =>
                                prev.map((b) => (b.id === id ? { ...b, leadershipImagePreview: reader.result as string } : b)),
                            );
                        };
                        reader.readAsDataURL(value);
                    }

                    return updatedLeadership;
                }
                return leadership;
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('name', formData.name);
        submitData.append('short_name', formData.short_name);
        submitData.append('slug', formData.slug);
        submitData.append('address', formData.address);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('website_url', formData.website_url);
        submitData.append('introduction', formData.introduction);
        submitData.append('description', formData.description);
        submitData.append('hos_message', formData.hos_message);
        submitData.append('hos_name', formData.hos_name);

        if (formData.logo) {
            submitData.append('logo', formData.logo);
        }
        if (formData.logo_b) {
            submitData.append('logo_b', formData.logo_b);
        }
        if (formData.hos_image) {
            submitData.append('hos_image', formData.hos_image);
        }

        sisterSchoolBanners.forEach((banner, index) => {
            if (banner.banner_image) {
                submitData.append(`sister_school_banner[${index}][banner_image]`, banner.banner_image);
            }
            submitData.append(`sister_school_banner[${index}][top_sub_title]`, banner.top_sub_title);
            submitData.append(`sister_school_banner[${index}][title]`, banner.title);
            submitData.append(`sister_school_banner[${index}][bottom_sub_title]`, banner.bottom_sub_title);
        });

        sisterSchoolLeaderships.forEach((leadership, leadershipIndex) => {
            if (leadership.image) {
                submitData.append(`sister_school_leadership[${leadershipIndex}][image]`, leadership.image);
            }
            submitData.append(`sister_school_leadership[${leadershipIndex}][name]`, leadership.name);
            submitData.append(`sister_school_leadership[${leadershipIndex}][position]`, leadership.position);
        });

        router.post('/api/sister_schools/sister-schools', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sister School created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Sister School');
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
                    Add Sister School
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New Sister School</DialogTitle>
                    <DialogDescription>Create a new sister school. Fill in the details below and click save when you're done.</DialogDescription>
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
                                    Short Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="short_name"
                                    placeholder="Enter short name"
                                    value={formData.short_name}
                                    onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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

                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="website_url">Website URL</Label>
                                <Input
                                    id="website_url"
                                    type="url"
                                    placeholder="Enter website URL"
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">
                                Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="address"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
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
                                <Label htmlFor="logo_b">Logo B</Label>
                                <Input id="logo_b" type="file" accept="image/*" onChange={handleLogoBChange} />
                                {logoBPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={logoBPreview || '/placeholder.svg'}
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
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                        />

                        {/* Head of School Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="hos_name">Head of School Name</Label>
                                <Input
                                    id="hos_name"
                                    placeholder="Enter head of school name"
                                    value={formData.hos_name}
                                    onChange={(e) => setFormData({ ...formData, hos_name: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hos_image">Head of School Image</Label>
                                <Input id="hos_image" type="file" accept="image/*" onChange={handleHosImageChange} />
                                {hosImagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={hosImagePreview || '/placeholder.svg'}
                                            alt="Head of School preview"
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <RichTextEditor
                            id="hos_message"
                            label="Head of School Message"
                            value={formData.hos_message}
                            onChange={(content) => setFormData({ ...formData, hos_message: content })}
                        />

                        {/* Sister School Banners Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Sister School Banners</Label>
                                <Button type="button" onClick={handleAddBanner} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Banner
                                </Button>
                            </div>

                            {sisterSchoolBanners.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">No banners added yet. Click "Add Banner" to create one.</p>
                            )}

                            {sisterSchoolBanners.map((banner, index) => (
                                <div key={banner.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Banner {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveBanner(banner.id)}
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
                                            <Label htmlFor={`banner-image-${banner.id}`}>Banner Image</Label>
                                            <Input
                                                id={`banner-image-${banner.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleBannerChange(banner.id, 'banner_image', e.target.files?.[0] || null)}
                                            />
                                            {banner.bannerPreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={banner.bannerPreview || '/placeholder.svg'}
                                                        alt="Banner preview"
                                                        className="h-40 w-full rounded border object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`top-sub-title-${banner.id}`}>Top Subtitle</Label>
                                        <Input
                                            id={`top-sub-title-${banner.id}`}
                                            placeholder="Enter top subtitle"
                                            value={banner.top_sub_title}
                                            onChange={(e) => handleBannerChange(banner.id, 'top_sub_title', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`title-${banner.id}`}>Title</Label>
                                        <Input
                                            id={`title-${banner.id}`}
                                            placeholder="Enter title"
                                            value={banner.title}
                                            onChange={(e) => handleBannerChange(banner.id, 'title', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`bottom-sub-title-${banner.id}`}>Bottom Subtitle</Label>
                                        <Input
                                            id={`bottom-sub-title-${banner.id}`}
                                            placeholder="Enter bottom subtitle"
                                            value={banner.bottom_sub_title}
                                            onChange={(e) => handleBannerChange(banner.id, 'bottom_sub_title', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sister School Leaderships Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Sister School Leaderships</Label>
                                <Button type="button" onClick={handleAddLeadership} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Leadership
                                </Button>
                            </div>

                            {sisterSchoolLeaderships.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">
                                    No banners added yet. Click "Add Leadership" to create one.
                                </p>
                            )}

                            {sisterSchoolLeaderships.map((leadership, index) => (
                                <div key={leadership.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Leadership {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveLeadership(leadership.id)}
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
                                            <Label htmlFor={`leadership-image-${leadership.id}`}>Leadership Image</Label>
                                            <Input
                                                id={`leadership-image-${leadership.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleLeadershipChange(leadership.id, 'image', e.target.files?.[0] || null)}
                                            />
                                            {leadership.leadershipImagePreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={leadership.leadershipImagePreview || '/placeholder.svg'}
                                                        alt="Leadership Image preview"
                                                        className="h-24 w-24 rounded border object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`name-${leadership.id}`}>Name</Label>
                                        <Input
                                            id={`name-${leadership.id}`}
                                            placeholder="Enter Name"
                                            value={leadership.name}
                                            onChange={(e) => handleLeadershipChange(leadership.id, 'name', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`position-${leadership.id}`}>Position</Label>
                                        <Input
                                            id={`position-${leadership.id}`}
                                            placeholder="Enter Position"
                                            value={leadership.position}
                                            onChange={(e) => handleLeadershipChange(leadership.id, 'position', e.target.value)}
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
                            {isSubmitting ? 'Saving...' : 'Save Sister School'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
