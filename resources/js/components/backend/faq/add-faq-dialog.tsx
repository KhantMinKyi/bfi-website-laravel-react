'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaqDataType } from '@/types';
import { router } from '@inertiajs/react';
import { Check, Plus, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddFaqProps {
    onSuccess?: () => void;
}

export function AddFaq({ onSuccess }: AddFaqProps) {
    const [open, setOpen] = React.useState(false);
    const [faq, setFaq] = React.useState<FaqDataType[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const resetForm = () => {
        setFaq([]);
    };

    const handleAddFaq = () => {
        const newFaq: FaqDataType = {
            id: `faq-${Date.now()}`,
            question: '',
            answer: '',
        };
        setFaq([...faq, newFaq]);
    };

    const handleRemoveFaq = (id: string) => {
        setFaq(faq.filter((faq) => faq.id !== id));
    };

    const handleFaqChange = (id: string, field: keyof FaqDataType, value: string | File | null) => {
        setFaq(
            faq.map((faq) => {
                if (faq.id === id) {
                    const updatedFaq = { ...faq, [field]: value };
                    return updatedFaq;
                }
                return faq;
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();

        faq.forEach((faq, index) => {
            submitData.append(`faq[${index}][question]`, faq.question);
            submitData.append(`faq[${index}][answer]`, faq.answer);
        });

        router.post('/api/faq/faqs', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Faq created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Faq');
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
                    Add Faq
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New FAQ</DialogTitle>
                    <DialogDescription>Create a new FAQ. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Faq Section */}
                        <div className="grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Frequently Asked Questions</Label>
                                <Button type="button" onClick={handleAddFaq} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add FAQ
                                </Button>
                            </div>

                            {faq.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground">No FAQ added yet. Click "Add FAQ" to create one.</p>
                            )}

                            {faq.map((faq, index) => (
                                <div key={faq.id} className="grid gap-4 rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">Faq {index + 1}</Label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveFaq(faq.id)}
                                            size="sm"
                                            variant="destructive"
                                            className="gap-2"
                                        >
                                            <X className="h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`question-${faq.id}`}>Question</Label>
                                        <Input
                                            id={`question-${faq.id}`}
                                            placeholder="Enter Question"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`answer-${faq.id}`}>Answer</Label>
                                        <Input
                                            id={`answer-${faq.id}`}
                                            placeholder="Enter answer"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)}
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
                            {isSubmitting ? 'Saving...' : 'Save FAQ'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
