'use client';

import { RichTextEditor } from '@/components/backend/core/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CategoryTag, Post, PostSetting } from '@/types';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface UpdatePostDialogProps {
    post: Post;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    postType: PostSetting[];
    categoryTag: CategoryTag[];
}

export function UpdatePostDialog({ post, open, onOpenChange, onSuccess, postType = [], categoryTag = [] }: UpdatePostDialogProps) {
    const [formData, setFormData] = React.useState({
        post_type_id: post.post_type_id.toString(),
        title: post.title,
        subtitle: post.subtitle ?? '',
        description: post.description,
        footer_description: post.footer_description ?? '',
        banner_img: null as File | null,
        images: null as FileList | null,
        start_date: post.start_date ?? '',
        end_date: post.end_date ?? '',
        registration_fee: post.registration_fee ?? '',
        award_description: post.award_description ?? '',
        video_url: post.video_url ?? '',
        location: post.location ?? '',
        category_tag_ids: [] as string[],
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const oldImageArray = post.images?.split(',');
    var oldImageArrayLayout = 2;
    if (oldImageArray && oldImageArray.length < 4) {
        oldImageArrayLayout = oldImageArray.length;
    }
    // Update form data when post prop changes
    React.useEffect(() => {
        if (post) {
            setFormData({
                post_type_id: post.post_type_id.toString(),
                title: post.title,
                subtitle: post.subtitle ?? '',
                description: post.description,
                footer_description: post.footer_description ?? '',
                banner_img: null,
                images: null,
                start_date: post.start_date ?? '',
                end_date: post.end_date ?? '',
                registration_fee: post.registration_fee ?? '',
                award_description: post.award_description ?? '',
                video_url: post.video_url ?? '',
                location: post.location ?? '',
                category_tag_ids: post.category_tags.map((ct) => ct.category_tag_id.toString()),
            });
        }
    }, [post]);

    // Find the currently selected post type so we can base conditional fields on its `is_activity` flag
    const selectedPostType = postType.find((pt) => pt.id.toString() === formData.post_type_id);

    // If `is_activity` is true, we should show the conditional fields (so hide = false).
    // If it's false or there is no selection yet, hide the conditional fields.
    const shouldHideConditionalFields = selectedPostType ? !Boolean(selectedPostType.is_activity) : true;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append('post_type_id', formData.post_type_id);
        submitData.append('post_type_is_activity', String(selectedPostType?.is_activity ?? 0));
        submitData.append('category_tag_ids', formData.category_tag_ids.join(','));
        submitData.append('title', formData.title);
        submitData.append('subtitle', formData.subtitle);
        submitData.append('description', formData.description);
        submitData.append('footer_description', formData.footer_description);

        if (formData.banner_img) {
            submitData.append('banner_img', formData.banner_img);
        }

        if (formData.images) {
            Array.from(formData.images).forEach((file, index) => {
                submitData.append(`images[${index}]`, file);
            });
        }

        submitData.append('video_url', formData.video_url);

        if (!shouldHideConditionalFields) {
            submitData.append('start_date', formData.start_date);
            submitData.append('end_date', formData.end_date);
            submitData.append('registration_fee', formData.registration_fee);
            submitData.append('award_description', formData.award_description);
            submitData.append('location', formData.location);
        }
        submitData.append('_method', 'PUT');

        router.post(`/api/public_data/event_and_post/posts/${post.id}`, submitData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Post updated successfully!');
                if (onSuccess) {
                    onSuccess();
                }
                onOpenChange(false);
            },
            onError: (errors) => {
                const msg = Object.values(errors).join(' • ');
                toast.error(msg || 'Failed to update Post');
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
                    <DialogTitle>Update Post</DialogTitle>
                    <DialogDescription>Update the post details below and click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="post_type_id">
                                    Post Type <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.post_type_id} onValueChange={(value) => setFormData({ ...formData, post_type_id: value })}>
                                    <SelectTrigger id="post_type_id">
                                        <SelectValue placeholder="Select Post Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {postType.map((pt) => (
                                            <SelectItem key={pt.id} value={pt.id.toString()}>
                                                {pt.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category_tag_ids">
                                    Category (or) Tag<span className="text-red-500">*</span>
                                </Label>
                                <MultiSelect
                                    values={formData.category_tag_ids}
                                    onValuesChange={(values) =>
                                        setFormData({
                                            ...formData,
                                            category_tag_ids: values,
                                        })
                                    }
                                >
                                    <MultiSelectTrigger className="w-full">
                                        <MultiSelectValue placeholder="Select categories..." />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent>
                                        <MultiSelectGroup>
                                            {categoryTag.map((ct) => (
                                                <MultiSelectItem key={ct.id} value={ct.id.toString()}>
                                                    {ct.title}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    placeholder="Enter subtitle (optional)"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                />
                            </div>
                        </div>

                        <RichTextEditor
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                        />

                        <RichTextEditor
                            id="footer_description"
                            label="Footer Description"
                            value={formData.footer_description}
                            onChange={(content) => setFormData({ ...formData, footer_description: content })}
                        />
                        <div className="grid grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="banner_img">
                                    Banner Image {post.banner_img && '(Current image will be replaced if you upload a new one)'}
                                </Label>
                                <Input
                                    id="banner_img"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, banner_img: e.target.files?.[0] || null })}
                                />
                            </div>
                            {post.banner_img && !formData.banner_img && (
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex">
                                        <img src={post.banner_img} alt="" className="w-40" />
                                    </div>
                                    <div className="text-sm text-green-500">Current Banner</div>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="images">Images (Multiple) {post.images && '(New images will be added)'}</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setFormData({ ...formData, images: e.target.files })}
                                />
                            </div>

                            {post.images && post.images.length > 0 && (
                                <div>
                                    <div className={`grid grid-cols-${oldImageArrayLayout}`}>
                                        {oldImageArray &&
                                            oldImageArray.length > 0 &&
                                            oldImageArray.map((e) => (
                                                <>
                                                    <img src={'/' + e} alt="" className="w-24" />
                                                </>
                                            ))}
                                    </div>
                                    <div className="text-center text-sm text-muted-foreground">Current images: {post.images.length} file(s)</div>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="video_url">Video URL</Label>
                            <Input
                                id="video_url"
                                type="url"
                                placeholder="Enter video URL (optional)"
                                value={formData.video_url}
                                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                            />
                        </div>

                        {!shouldHideConditionalFields && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="start_date">
                                            Start Date <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={formData.start_date}
                                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="end_date">
                                            End Date <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={formData.end_date}
                                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="registration_fee">
                                            Registration Fee <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="registration_fee"
                                            placeholder="Enter registration fee"
                                            value={formData.registration_fee}
                                            onChange={(e) => setFormData({ ...formData, registration_fee: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="location">
                                            Location <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="location"
                                            placeholder="Enter location"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <RichTextEditor
                                    id="award_description"
                                    label="Award Description"
                                    value={formData.award_description}
                                    onChange={(content) => setFormData({ ...formData, award_description: content })}
                                />
                            </>
                        )}
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
                            {isSubmitting ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
