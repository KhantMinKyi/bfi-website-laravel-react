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
import { BfiOlympiad } from '@/types';
import { AddBfiOlympiad } from './add-olympiad-dialog';
import { DeleteBfiOlympiadDialog } from './delete-olympiad-dialog';
import { UpdateBfiOlympiadDialog } from './update-olympiad-dialog';
export function BfiOlympiadDataTable() {
    const [data, setData] = React.useState<BfiOlympiad[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updatePhotoDialogOpen, setUpdatePhotoDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedBfiOlympiad, setSelectedBfiOlympiad] = React.useState<BfiOlympiad | null>(null);

    const fetchBfiOlympiads = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/public_data/bfi_olympiads');

            if (!response.ok) {
                throw new Error('Failed to fetch BfiOlympiads');
            }
            const result = await response.json();
            setData(result.bfi_olympaids);
        } catch (error) {
            console.error('Error fetching BfiOlympiads:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    React.useEffect(() => {
        fetchBfiOlympiads();
    }, [fetchBfiOlympiads]);
    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected BfiOlympiad setting when dialog closes
            setSelectedBfiOlympiad(null);
        }
    };
    const handleUpdatePhotoDialogChange = (open: boolean) => {
        setUpdatePhotoDialogOpen(open);
        if (!open) {
            // Reset selected BfiOlympiad setting when dialog closes
            setSelectedBfiOlympiad(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected BfiOlympiad setting when dialog closes
            setSelectedBfiOlympiad(null);
        }
    };

    const handleOpenUpdateDialog = (bfiOlympiad: BfiOlympiad) => {
        setSelectedBfiOlympiad(bfiOlympiad);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdatePhotoDialog = (bfiOlympiad: BfiOlympiad) => {
        setSelectedBfiOlympiad(bfiOlympiad);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdatePhotoDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (bfiOlympiad: BfiOlympiad) => {
        setSelectedBfiOlympiad(bfiOlympiad);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };

    const columns: ColumnDef<BfiOlympiad>[] = React.useMemo(
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
                accessorKey: 'title',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Title
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
            },
            {
                accessorKey: 'information',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Information
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium">{row.getValue('information')}</div>,
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const bfiOlympiad = row.original;

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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(bfiOlympiad.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(bfiOlympiad)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleOpenDeleteDialog(bfiOlympiad)}
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
                            Add BFI Olympiad
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
                                <TableHead>Title</TableHead>
                                <TableHead>Information</TableHead>
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
                                        <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading BFI Olympiad Data...</div>
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
                    <AddBfiOlympiad onSuccess={fetchBfiOlympiads} />
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

            {selectedBfiOlympiad && (
                <>
                    <UpdateBfiOlympiadDialog
                        bfiOlympiad={selectedBfiOlympiad}
                        open={updateDialogOpen}
                        onOpenChange={handleUpdateDialogChange}
                        onSuccess={fetchBfiOlympiads}
                    />
                    <DeleteBfiOlympiadDialog
                        bfiOlympiad={selectedBfiOlympiad}
                        open={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        onSuccess={fetchBfiOlympiads}
                    />
                </>
            )}
        </div>
    );
}
