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

interface SisterSchool {
    id: string | number;
    name: string;
    short_name: string;
    slug: string;
    logo?: string;
    logo_b?: string;
    address: string;
    email: string;
    phone: string;
    website_url: string;
    introduction: string;
    description: string;
    hos_message: string;
    hos_image?: string;
    hos_name: string;
}

interface UpdateSisterSchoolDialogProps {
    sisterSchool: SisterSchool;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateSisterSchoolDialog({ sisterSchool, open, onOpenChange, onSuccess }: UpdateSisterSchoolDialogProps) {
    const [formData, setFormData] = React.useState({
        name: sisterSchool.name,
        short_name: sisterSchool.short_name,
        slug: sisterSchool.slug,
        logo: null as File | null,
        logo_b: null as File | null,
        address: sisterSchool.address,
        email: sisterSchool.email,
        phone: sisterSchool.phone,
        website_url: sisterSchool.website_url,
        introduction: sisterSchool.introduction,
        description: sisterSchool.description,
        hos_message: sisterSchool.hos_message,
        hos_image: null as File | null,
        hos_name: sisterSchool.hos_name,
    });

    const [logoPreview, setLogoPreview] = React.useState<string>(sisterSchool.logo || '');
    const [logoBPreview, setLogoBPreview] = React.useState<string>(sisterSchool.logo_b || '');
    const [hosImagePreview, setHosImagePreview] = React.useState<string>(sisterSchool.hos_image || '');
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
            setLogoPreview(sisterSchool.logo || '');
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
            setLogoBPreview(sisterSchool.logo_b || '');
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
            setHosImagePreview(sisterSchool.hos_image || '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
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

        router.post(`/api/sister_schools/sister-schools/${sisterSchool.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sister School updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Sister School');
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
                    <DialogTitle>Update Sister School</DialogTitle>
                    <DialogDescription>Update the sister school details below and click save when you're done.</DialogDescription>
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
                                    disabled
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                                <span className="mx-2 text-xs text-gray-500 dark:text-gray-500">Cannot edit Slug after creating data</span>
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
                            {isSubmitting ? 'Updating...' : 'Update Sister School'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
