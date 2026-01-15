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
import { ArrowUpDown, ImagePlus, MoreHorizontal, Pencil, Trash2, UserCog } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { SisterSchool } from '@/types';
import { AddSisterSchool } from './add-sister-school-dialog';
import { DeleteSisterSchoolDialog } from './delete-sister-school-dialog';
import { UpdateSisterSchoolBannerDialog } from './update-sister-school-banner-dialog';
import { UpdateSisterSchoolDialog } from './update-sister-school-dialog';
import { UpdateSisterSchoolRelatedCampusDialog } from './update-sister-school-related-campus-dialog';

export function SisterSchoolDataTable() {
    const [data, setData] = React.useState<SisterSchool[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updateBannerDialogOpen, setUpdateBannerDialogOpen] = React.useState(false);
    const [updateLeadershipDialogOpen, setUpdateLeadershipDialogOpen] = React.useState(false);
    const [updateRelatedCampusDialogOpen, setUpdateRelatedCampusDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedSisterSchool, setSelectedSisterSchool] = React.useState<SisterSchool | null>(null);

    const fetchSisterSchools = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/sister_schools/sister-schools');

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
        fetchSisterSchools();
    }, [fetchSisterSchools]);
    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected sisterSchool setting when dialog closes
            setSelectedSisterSchool(null);
        }
    };
    const handleUpdateBannerDialogChange = (open: boolean) => {
        setUpdateBannerDialogOpen(open);
        if (!open) {
            // Reset selected sisterSchool setting when dialog closes
            setSelectedSisterSchool(null);
        }
    };
    const handleUpdateLeadershipDialogChange = (open: boolean) => {
        setUpdateLeadershipDialogOpen(open);
        if (!open) {
            // Reset selected sisterSchool setting when dialog closes
            setSelectedSisterSchool(null);
        }
    };
    const handleUpdateRelatedCampusDialogChange = (open: boolean) => {
        setUpdateRelatedCampusDialogOpen(open);
        if (!open) {
            // Reset selected sisterSchool setting when dialog closes
            setSelectedSisterSchool(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected sisterSchool setting when dialog closes
            setSelectedSisterSchool(null);
        }
    };

    const handleOpenUpdateDialog = (sisterSchool: SisterSchool) => {
        setSelectedSisterSchool(sisterSchool);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdateBannerDialog = (sisterSchool: SisterSchool) => {
        setSelectedSisterSchool(sisterSchool);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateBannerDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdateLeadershipDialog = (sisterSchool: SisterSchool) => {
        setSelectedSisterSchool(sisterSchool);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateLeadershipDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdateRelatedCampusDialog = (sisterSchool: SisterSchool) => {
        setSelectedSisterSchool(sisterSchool);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateRelatedCampusDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (sisterSchool: SisterSchool) => {
        setSelectedSisterSchool(sisterSchool);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };

    const columns: ColumnDef<SisterSchool>[] = React.useMemo(
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
                accessorKey: 'logo',
                header: 'Logo',
                cell: ({ row }) => {
                    const sisterSchool = row.original;
                    return (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={sisterSchool.logo || '/placeholder.svg'} alt={sisterSchool.name} />
                            <AvatarFallback>
                                {sisterSchool.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    );
                },
                enableSorting: false,
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
                id: 'email',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Email
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.email,
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return <div className="font-medium">{value}</div>;
                },
            },
            {
                id: 'address',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Address
                        <ArrowUpDown />
                    </Button>
                ),
                accessorFn: (row) => row.address,
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
                cell: ({ row }) => (
                    <div className="font-medium">
                        {row.getValue('status') == 1 ? <div className="text-green-500">Active</div> : <div className="text-red-500">Inactive</div>}
                    </div>
                ),
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const sisterSchool = row.original;

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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(sisterSchool.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(sisterSchool)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleOpenUpdateBannerDialog(sisterSchool)}>
                                    <ImagePlus className="mr-2 h-4 w-4" />
                                    Update Banner
                                </DropdownMenuItem>
                                {/* 
                                <DropdownMenuItem onClick={() => handleOpenUpdateLeadershipDialog(sisterSchool)}>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Update Leadership
                                </DropdownMenuItem> */}
                                <DropdownMenuItem onClick={() => handleOpenUpdateRelatedCampusDialog(sisterSchool)}>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Update Related Campus
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleOpenDeleteDialog(sisterSchool)}
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
                            Add Schools
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
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
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
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading Schools Data...</div>
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
                    <AddSisterSchool onSuccess={fetchSisterSchools} />
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

            {selectedSisterSchool && (
                <>
                    <UpdateSisterSchoolDialog
                        sisterSchool={selectedSisterSchool}
                        open={updateDialogOpen}
                        onOpenChange={handleUpdateDialogChange}
                        onSuccess={fetchSisterSchools}
                    />
                    <DeleteSisterSchoolDialog
                        sisterSchool={selectedSisterSchool}
                        open={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        onSuccess={fetchSisterSchools}
                    />
                    <UpdateSisterSchoolBannerDialog
                        sisterSchoolBanners={selectedSisterSchool.banners}
                        sisterSchoolId={selectedSisterSchool.id}
                        open={updateBannerDialogOpen}
                        onOpenChange={handleUpdateBannerDialogChange}
                        onSuccess={fetchSisterSchools}
                    />
                    {/* <UpdateSisterSchoolLeadershipDialog
                        sisterSchoolLeaderships={selectedSisterSchool.leaderships}
                        sisterSchoolId={selectedSisterSchool.id}
                        open={updateLeadershipDialogOpen}
                        onOpenChange={handleUpdateLeadershipDialogChange}
                        onSuccess={fetchSisterSchools}
                    /> */}
                    <UpdateSisterSchoolRelatedCampusDialog
                        sisterSchoolRelatedCampuses={selectedSisterSchool.related_campuses}
                        sisterSchoolId={selectedSisterSchool.id}
                        open={updateRelatedCampusDialogOpen}
                        onOpenChange={handleUpdateRelatedCampusDialogChange}
                        onSuccess={fetchSisterSchools}
                    />
                </>
            )}
        </div>
    );
}
