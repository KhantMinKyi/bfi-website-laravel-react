'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddCSAProps {
    onSuccess?: () => void;
}

export function AddCSA({ onSuccess }: AddCSAProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        date: '',
        image: null as File | null,
        is_donation: '1' as const,
    });

    const [imagePreview, setImagePreview] = React.useState<string>('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            image: null,
            is_donation: '1',
        });
        setImagePreview('');
    };

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
            setImagePreview('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('title', formData.title);
        submitData.append('date', formData.date);
        submitData.append('is_donation', formData.is_donation);

        if (formData.image) {
            submitData.append('image', formData.image);
        }

        router.post('/api/site_profile/csa', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('CSA created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create CSA');
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
                    Add CSA
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New CSA</DialogTitle>
                    <DialogDescription>Create a new CSA. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
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

                            <div className="grid gap-2">
                                <Label htmlFor="date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Image */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="is_donation">Computer Skill Level</Label>
                                <Select value={formData.is_donation} onValueChange={(value: any) => setFormData({ ...formData, is_donation: value })}>
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
                            onClick={() => setOpen(false)}
                            className="cursor-pointer gap-2 bg-red-500 text-white hover:bg-red-700"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                            <Check />
                            {isSubmitting ? 'Saving...' : 'Save CSA'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
