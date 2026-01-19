'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Italic, Link, List, ListOrdered, Underline } from 'lucide-react';
import React from 'react';

interface RichTextEditorProps {
    id: string;
    label: string;
    value: string;
    onChange: (content: string) => void;
    required?: boolean;
}

export function RichTextEditor({ id, label, value, onChange, required }: RichTextEditorProps) {
    const editorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const executeCommand = (command: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        handleInput();
    };

    const insertHeading = (level: number) => {
        editorRef.current?.focus();
        document.execCommand('formatBlock', false, `<h${level}>`);
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');

        if (!text) return;

        // Create a temporary container to parse the pasted content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        // Remove all style attributes and background colors
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach((el) => {
            el.removeAttribute('style');
            el.removeAttribute('bgcolor');
        });

        // Ensure lists are preserved properly
        const lists = tempDiv.querySelectorAll('ul, ol');
        lists.forEach((list) => {
            list.removeAttribute('style');
            const items = list.querySelectorAll('li');
            items.forEach((item) => {
                item.removeAttribute('style');
            });
        });

        // Get the cleaned HTML
        let cleanedHTML = tempDiv.innerHTML;

        // Insert the cleaned content
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();

            const fragment = document.createElement('div');
            fragment.innerHTML = cleanedHTML;

            while (fragment.firstChild) {
                range.insertNode(fragment.firstChild);
            }

            // Move cursor to the end of inserted content
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // Trigger the onChange event
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>

            <div className="rounded-md border">
                <div className="flex flex-wrap gap-1 border-b bg-muted/50 p-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(1)} className="h-8 w-8 p-0" title="Heading 1">
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(2)} className="h-8 w-8 p-0" title="Heading 2">
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <div className="mx-1 h-8 w-px bg-border" />
                    <Button type="button" variant="ghost" size="sm" onClick={() => executeCommand('bold')} className="h-8 w-8 p-0" title="Bold">
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => executeCommand('italic')} className="h-8 w-8 p-0" title="Italic">
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('underline')}
                        className="h-8 w-8 p-0"
                        title="Underline"
                    >
                        <Underline className="h-4 w-4" />
                    </Button>
                    <div className="mx-1 h-8 w-px bg-border" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('insertUnorderedList')}
                        className="h-8 w-8 p-0"
                        title="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('insertOrderedList')}
                        className="h-8 w-8 p-0"
                        title="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                    <div className="mx-1 h-8 w-px bg-border" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('justifyLeft')}
                        className="h-8 w-8 p-0"
                        title="Align Left"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('justifyCenter')}
                        className="h-8 w-8 p-0"
                        title="Align Center"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => executeCommand('justifyRight')}
                        className="h-8 w-8 p-0"
                        title="Align Right"
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                    <div className="mx-1 h-8 w-px bg-border" />
                    <Button type="button" variant="ghost" size="sm" onClick={insertLink} className="h-8 w-8 p-0" title="Insert Link">
                        <Link className="h-4 w-4" />
                    </Button>
                </div>

                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onPaste={handlePaste}
                    className="prose prose-sm min-h-[200px] max-w-none p-4 text-foreground focus:outline-none"
                    style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                />
            </div>
        </div>
    );
}
