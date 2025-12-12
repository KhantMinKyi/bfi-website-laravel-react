'use client';

import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaqDataType } from '@/types';
import { AddFaq } from './add-faq-dialog';
import { DeleteFaqDialog } from './delete-faq-dialog';
import { UpdateFaqDialog } from './update-faq-dialog';
// import { AddSisterSchool } from './add-sister-school-dialog';
// import { DeleteSisterSchoolDialog } from './delete-sister-school-dialog';
// import { UpdateSisterSchoolBannerDialog } from './update-sister-school-banner-dialog';
// import { UpdateSisterSchoolDialog } from './update-sister-school-dialog';
// import { UpdateSisterSchoolLeadershipDialog } from './update-sister-school-leadership-dialog';

export function FaqDataTable() {
    const [data, setData] = React.useState<FaqDataType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updateBannerDialogOpen, setUpdateBannerDialogOpen] = React.useState(false);
    const [updateLeadershipDialogOpen, setUpdateLeadershipDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedFaq, setSelectedFaq] = React.useState<FaqDataType | null>(null);

    const fetchFaqs = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/faq/faqs');

            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    React.useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected Faq setting when dialog closes
            setSelectedFaq(null);
        }
    };
    const handleUpdateBannerDialogChange = (open: boolean) => {
        setUpdateBannerDialogOpen(open);
        if (!open) {
            // Reset selected Faq setting when dialog closes
            setSelectedFaq(null);
        }
    };
    const handleUpdateLeadershipDialogChange = (open: boolean) => {
        setUpdateLeadershipDialogOpen(open);
        if (!open) {
            // Reset selected Faq setting when dialog closes
            setSelectedFaq(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected Faq setting when dialog closes
            setSelectedFaq(null);
        }
    };

    const handleOpenUpdateDialog = (faq: FaqDataType) => {
        setSelectedFaq(faq);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdateBannerDialog = (faq: FaqDataType) => {
        setSelectedFaq(faq);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateBannerDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdateLeadershipDialog = (faq: FaqDataType) => {
        setSelectedFaq(faq);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateLeadershipDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (faq: FaqDataType) => {
        setSelectedFaq(faq);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };

    const columns: ColumnDef<FaqDataType>[] = React.useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'question',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Question
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium">{row.getValue('question')}</div>,
            },
            {
                id: 'answer',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Answer
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.answer,
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                id: 'created_user',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Created User
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.created_user?.name,
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const faq = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(faq.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(faq)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenDeleteDialog(faq)} className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex items-center gap-4 py-4">
                    <Input placeholder="Filter by name or email..." disabled className="max-w-sm" value="" onChange={() => {}} />
                    <div className="ml-auto flex items-center gap-2">
                        <Button disabled className="cursor-pointer gap-2 bg-indigo-700 text-white hover:bg-indigo-900">
                            Add Faqs
                        </Button>
                        {/* <Button variant="outline" disabled>
                            Columns <ChevronDown />
                        </Button> */}
                    </div>
                </div>
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead>Answer</TableHead>
                                <TableHead>Cerated User</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading Faqs Data...</div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 py-4">
                <Input
                    placeholder="Search across all columns..."
                    value={globalFilter ?? ''}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <div className="ml-auto flex items-center gap-2">
                    <AddFaq onSuccess={fetchFaqs} />
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>

            {selectedFaq && (
                <>
                    <UpdateFaqDialog faq={selectedFaq} open={updateDialogOpen} onOpenChange={handleUpdateDialogChange} onSuccess={fetchFaqs} />
                    <DeleteFaqDialog faq={selectedFaq} open={deleteDialogOpen} onOpenChange={handleDeleteDialogChange} onSuccess={fetchFaqs} />
                </>
            )}
        </div>
    );
}
