'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import { Check, Pencil } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface FaqDataType {
    id: string | number;
    question: string;
    answer: string;
}

interface UpdateFaqDialogProps {
    faq: FaqDataType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function UpdateFaqDialog({ faq, open, onOpenChange, onSuccess }: UpdateFaqDialogProps) {
    const [formData, setFormData] = React.useState({
        question: faq.question,
        answer: faq.answer,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        submitData.append('_method', 'PUT');
        submitData.append('question', formData.question);
        submitData.append('answer', formData.answer);

        router.post(`/api/faq/faqs/${faq.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('FAQ updated successfully!');
                onOpenChange(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update FAQ');
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
                    <DialogTitle>Update Frequently Asked Questions</DialogTitle>
                    <DialogDescription>Update the frequently asked questions details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="question">
                                    Question <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="question"
                                    placeholder="Enter Question"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="answer">
                                    Answer<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="answer"
                                    placeholder="Enter Answer"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                />
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
                            {isSubmitting ? 'Updating...' : 'Update FAQ'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
