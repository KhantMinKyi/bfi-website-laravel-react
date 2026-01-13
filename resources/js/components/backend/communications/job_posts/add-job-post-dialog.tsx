'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface AddJobPostProps {
    onSuccess?: () => void;
}

export function AddJobPost({ onSuccess }: AddJobPostProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        function: '',
        sub_function: '',
        gender: 'Both' as const,
        experience_level: 'Entry Level' as const,
        education_level: 'High School Diploma' as const,
        number_of_post: 1,
        type: 'Full Time' as const,
        computer_skill: 'Beginner' as const,
        industry: 'IT/Computer' as const,
        maximun_salary: 0,
        is_hide_salary: false,
        employee_type: 'Both' as const,
        email: '',
        description: '',
        requirement: '',
        benefits: '',
        highlights: '',
        career_growth: '',
        is_active: true,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            function: '',
            sub_function: '',
            gender: 'Both',
            experience_level: 'Entry Level',
            education_level: 'High School Diploma',
            number_of_post: 1,
            type: 'Full Time',
            computer_skill: 'Beginner',
            industry: 'IT/Computer',
            maximun_salary: 0,
            is_hide_salary: false,
            employee_type: 'Both',
            email: '',
            description: '',
            requirement: '',
            benefits: '',
            highlights: '',
            career_growth: '',
            is_active: true,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/api/communications/jobs', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Job Post created successfully!');
                resetForm();
                setOpen(false);

                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to create Job Post');
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
                    Add Job Post
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Add New Job Post</DialogTitle>
                    <DialogDescription>Create a new Job Post. Fill in the details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Job Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter job title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="function">
                                    Function <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="function"
                                    placeholder="Enter function"
                                    value={formData.function}
                                    onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="sub_function">
                                    Sub Function <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="sub_function"
                                    placeholder="Enter sub function"
                                    value={formData.sub_function}
                                    onChange={(e) => setFormData({ ...formData, sub_function: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter contact email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Dropdowns - Row 1 */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value: any) => setFormData({ ...formData, gender: value })}>
                                    <SelectTrigger id="gender">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="experience_level">Experience Level</Label>
                                <Select
                                    value={formData.experience_level}
                                    onValueChange={(value: any) => setFormData({ ...formData, experience_level: value })}
                                >
                                    <SelectTrigger id="experience_level">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                                        <SelectItem value="Experienced Non-Manager">Experienced Non-Manager</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="Director and Above">Director and Above</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="education_level">Education Level</Label>
                                <Select
                                    value={formData.education_level}
                                    onValueChange={(value: any) => setFormData({ ...formData, education_level: value })}
                                >
                                    <SelectTrigger id="education_level">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High School Diploma">High School Diploma</SelectItem>
                                        <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                                        <SelectItem value="Bachelor`s Degree">Bachelor{"'"}s Degree</SelectItem>
                                        <SelectItem value="Master`s Degree">Master{"'"}s Degree</SelectItem>
                                        <SelectItem value="Doctorate (Ph.D.)">Doctorate (Ph.D.)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Dropdowns - Row 2 */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Job Type</Label>
                                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                                    <SelectTrigger id="type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full Time">Full Time</SelectItem>
                                        <SelectItem value="Part Time">Part Time</SelectItem>
                                        <SelectItem value="Temp/Contract">Temp/Contract</SelectItem>
                                        <SelectItem value="Voluntary">Voluntary</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Project Specific">Project Specific</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="computer_skill">Computer Skill Level</Label>
                                <Select
                                    value={formData.computer_skill}
                                    onValueChange={(value: any) => setFormData({ ...formData, computer_skill: value })}
                                >
                                    <SelectTrigger id="computer_skill">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="employee_type">Employee Type</Label>
                                <Select
                                    value={formData.employee_type}
                                    onValueChange={(value: any) => setFormData({ ...formData, employee_type: value })}
                                >
                                    <SelectTrigger id="employee_type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Local">Local</SelectItem>
                                        <SelectItem value="Foreigner">Foreigner</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Dropdowns - Row 3 */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Select value={formData.industry} onValueChange={(value: any) => setFormData({ ...formData, industry: value })}>
                                    <SelectTrigger id="industry">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IT/Computer">IT/Computer</SelectItem>
                                        <SelectItem value="Banking/Insurance/Microfinance">Banking/Insurance/Microfinance</SelectItem>
                                        <SelectItem value="Education/Training">Education/Training</SelectItem>
                                        <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                                        <SelectItem value="Construction/Building/Architecture">Construction/Building/Architecture</SelectItem>
                                        <SelectItem value="Medical/Hospital">Medical/Hospital</SelectItem>
                                        <SelectItem value="Advertising/PR/Marketing">Advertising/PR/Marketing</SelectItem>
                                        <SelectItem value="Accounting">Accounting</SelectItem>
                                        <SelectItem value="Recruitment">Recruitment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="number_of_post">Number of Posts</Label>
                                <Input
                                    id="number_of_post"
                                    type="number"
                                    min="1"
                                    value={formData.number_of_post}
                                    onChange={(e) => setFormData({ ...formData, number_of_post: Number.parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="maximun_salary">Maximum Salary</Label>
                                <Input
                                    id="maximun_salary"
                                    type="number"
                                    min="0"
                                    value={formData.maximun_salary}
                                    onChange={(e) => setFormData({ ...formData, maximun_salary: Number.parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="grid items-end gap-2">
                                <Label htmlFor="is_hide_salary">Hide Salary</Label>
                                <Select
                                    value={formData.is_hide_salary ? 'true' : 'false'}
                                    onValueChange={(value: string) => setFormData({ ...formData, is_hide_salary: value === 'true' })}
                                >
                                    <SelectTrigger id="is_hide_salary">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="false">Show</SelectItem>
                                        <SelectItem value="true">Hide</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Descriptions */}
                        <RichTextEditor
                            id="description"
                            label="Job Description"
                            value={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                        />

                        <RichTextEditor
                            id="requirement"
                            label="Requirements"
                            value={formData.requirement}
                            onChange={(content) => setFormData({ ...formData, requirement: content })}
                        />

                        <RichTextEditor
                            id="benefits"
                            label="Benefits"
                            value={formData.benefits}
                            onChange={(content) => setFormData({ ...formData, benefits: content })}
                        />

                        <RichTextEditor
                            id="highlights"
                            label="Highlights"
                            value={formData.highlights}
                            onChange={(content) => setFormData({ ...formData, highlights: content })}
                        />

                        <RichTextEditor
                            id="career_growth"
                            label="Career Growth Opportunities"
                            value={formData.career_growth}
                            onChange={(content) => setFormData({ ...formData, career_growth: content })}
                        />
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
                            {isSubmitting ? 'Saving...' : 'Save Job Post'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
