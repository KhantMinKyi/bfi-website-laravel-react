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
import { ArrowUpDown, ImagePlus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
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
import { Curriculum } from '@/types';
import { AddCurriculum } from './add-curriculum-dialog';
import { DeleteCurriculumDialog } from './delete-curriculum-dialog';
import { UpdateCurriculumDialog } from './update-curriculum-dialog';
import { UpdateCurriculumPhotoDialog } from './update-curriculum-photo-dialog';

export function CurriculumDataTable() {
    const [data, setData] = React.useState<Curriculum[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updatePhotoDialogOpen, setUpdatePhotoDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedCurriculum, setSelectedCurriculum] = React.useState<Curriculum | null>(null);

    const fetchCurriculums = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/education/curriculum');

            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }
            const result = await response.json();
            setData(result.curricula);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    React.useEffect(() => {
        fetchCurriculums();
    }, [fetchCurriculums]);
    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected Curriculum setting when dialog closes
            setSelectedCurriculum(null);
        }
    };
    const handleUpdatePhotoDialogChange = (open: boolean) => {
        setUpdatePhotoDialogOpen(open);
        if (!open) {
            // Reset selected Curriculum setting when dialog closes
            setSelectedCurriculum(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected Curriculum setting when dialog closes
            setSelectedCurriculum(null);
        }
    };

    const handleOpenUpdateDialog = (curriculum: Curriculum) => {
        setSelectedCurriculum(curriculum);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdatePhotoDialog = (curriculum: Curriculum) => {
        setSelectedCurriculum(curriculum);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdatePhotoDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (curriculum: Curriculum) => {
        setSelectedCurriculum(curriculum);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };

    const columns: ColumnDef<Curriculum>[] = React.useMemo(
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
                accessorKey: 'name',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Name
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
            },
            {
                id: 'sub_title',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Sub Title
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.sub_title,
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                id: 'introduction',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Introduction
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.introduction,
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium" dangerouslySetInnerHTML={{ __html: value }} />;
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const curriculum = row.original;

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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(curriculum.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(curriculum)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleOpenUpdatePhotoDialog(curriculum)}>
                                    <ImagePlus className="mr-2 h-4 w-4" />
                                    Update Photo
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleOpenDeleteDialog(curriculum)}
                                    className="text-destructive focus:text-destructive"
                                >
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
                            Add Academic
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
                                <TableHead>Name</TableHead>
                                <TableHead>Sub Title</TableHead>
                                <TableHead>Introduction</TableHead>
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
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading Academic Data...</div>
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
                    <AddCurriculum onSuccess={fetchCurriculums} />
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

            {selectedCurriculum && (
                <>
                    <UpdateCurriculumDialog
                        curriculum={selectedCurriculum}
                        open={updateDialogOpen}
                        onOpenChange={handleUpdateDialogChange}
                        onSuccess={fetchCurriculums}
                    />
                    <DeleteCurriculumDialog
                        curriculum={selectedCurriculum}
                        open={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        onSuccess={fetchCurriculums}
                    />
                    <UpdateCurriculumPhotoDialog
                        curriculumPhotos={selectedCurriculum.related_photos}
                        curriculumId={selectedCurriculum.id}
                        open={updatePhotoDialogOpen}
                        onOpenChange={handleUpdatePhotoDialogChange}
                        onSuccess={fetchCurriculums}
                    />
                </>
            )}
        </div>
    );
}
