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
import { CategoryTag } from '@/types';
import { AddCategoryTagSetting } from './add-category-tag-setting-dialog';
import { DeleteCategoryTagSettingDialog } from './delete-category-tag-setting-dialog';
import { UpdateCategoryTagSettingDialog } from './update-category-tag-setting-dialog';

export function CategoryTagSettingDataTable() {
    const [data, setData] = React.useState<CategoryTag[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedCategoryTag, setSelectedCategoryTag] = React.useState<CategoryTag | null>(null);

    const fetchCategoryTagSettings = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/public_data/event_and_post/category-tag-settings');

            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }
            const result = await response.json();
            setData(result.category_tags);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchCategoryTagSettings();
    }, [fetchCategoryTagSettings]);
    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected post setting when dialog closes
            setSelectedCategoryTag(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected post setting when dialog closes
            setSelectedCategoryTag(null);
        }
    };

    const handleOpenUpdateDialog = (categoryTag: CategoryTag) => {
        setSelectedCategoryTag(categoryTag);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (categoryTag: CategoryTag) => {
        setSelectedCategoryTag(categoryTag);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };
    const columns: ColumnDef<CategoryTag>[] = React.useMemo(
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
                accessorKey: 'type',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Type
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium uppercase">{row.getValue('type')}</div>,
            },
            {
                id: 'created_user_name',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Created By
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.created_user?.name ?? '',
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                id: 'updated_user_name',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Updated By
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.updated_user?.name ?? '',
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                accessorKey: 'status',
                header: ({ column }) => {
                    return (
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Status
                            <ArrowUpDown />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className="font-medium">{row.getValue('status') == 1 ? 'Active' : 'Inactive'}</div>,
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const CategoryTag = row.original;

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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(CategoryTag.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(CategoryTag)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleOpenDeleteDialog(CategoryTag)}
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
                            Add Category & Tag Setting
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
                                <TableHead>Status</TableHead>
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
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading settings...</div>
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
                    <AddCategoryTagSetting onSuccess={fetchCategoryTagSettings} />
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

            {selectedCategoryTag && (
                <>
                    <UpdateCategoryTagSettingDialog
                        categoryTag={selectedCategoryTag}
                        open={updateDialogOpen}
                        onOpenChange={handleUpdateDialogChange}
                        onSuccess={fetchCategoryTagSettings}
                    />
                    <DeleteCategoryTagSettingDialog
                        categoryTag={selectedCategoryTag}
                        open={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        onSuccess={fetchCategoryTagSettings}
                    />
                </>
            )}
        </div>
    );
}
