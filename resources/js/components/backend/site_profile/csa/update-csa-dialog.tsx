'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CSADataType } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Pencil } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdateCSADialogProps {
    csa: CSADataType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateCSADialog({ csa, open, onOpenChange, onSuccess }: UpdateCSADialogProps) {
    const [formData, setFormData] = React.useState({
        title: csa.title,
        date: csa.date,
        image: null as File | null,
        is_donation: csa.is_donation,
    });

    const [imagePreview, setImagePreview] = React.useState<string>(csa.image || '');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, image: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(csa.image || '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('title', formData.title);
        submitData.append('date', formData.date);
        submitData.append('is_donation', String(formData.is_donation));

        if (formData.image) {
            submitData.append('image', formData.image);
        }

        router.post(`/api/site_profile/csa/${csa.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('CSA updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update CSA');
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
                    <DialogTitle>Update CSA</DialogTitle>
                    <DialogDescription>Update the CSA details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    placeholder="Enter date"
                                    value={formData.date}
                                    disabled
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <span className="mx-2 text-right text-xs text-gray-500 dark:text-gray-500"></span>
                            <span className="mx-2 text-xs text-gray-500 dark:text-gray-500">Cannot edit Slug after creating data</span>
                        </div>

                        {/* Image */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="is_donation">Education Level</Label>
                                <Select
                                    value={String(formData.is_donation)}
                                    onValueChange={(value: any) => setFormData({ ...formData, is_donation: value })}
                                >
                                    <SelectTrigger id="is_donation">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Donation</SelectItem>
                                        <SelectItem value="0">Program</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">
                                    Image <span className="text-red-500">*</span>
                                </Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview || '/placeholder.svg'}
                                            alt="Image preview"
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
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
                            {isSubmitting ? 'Updating...' : 'Update CSA'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
