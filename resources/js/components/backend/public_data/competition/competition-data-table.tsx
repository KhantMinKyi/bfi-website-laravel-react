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
import { Competition } from '@/types';
import { AddCompetition } from './add-competition-dialog';
import { DeleteCompetitionDialog } from './delete-competition-dialog';
import { UpdateCompetitionPhotoDialog } from './update-competition-photo-dialog';

export function CompetitionDataTable() {
    const [data, setData] = React.useState<Competition[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updatePhotoDialogOpen, setUpdatePhotoDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedCompetition, setSelectedCompetition] = React.useState<Competition | null>(null);

    const fetchCompetitions = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/public_data/competitions');

            if (!response.ok) {
                throw new Error('Failed to fetch Competitions');
            }
            const result = await response.json();
            setData(result.competitions);
        } catch (error) {
            console.error('Error fetching Competitions:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    React.useEffect(() => {
        fetchCompetitions();
    }, [fetchCompetitions]);
    const handleUpdateDialogChange = (open: boolean) => {
        setUpdateDialogOpen(open);
        if (!open) {
            // Reset selected Competition setting when dialog closes
            setSelectedCompetition(null);
        }
    };
    const handleUpdatePhotoDialogChange = (open: boolean) => {
        setUpdatePhotoDialogOpen(open);
        if (!open) {
            // Reset selected Competition setting when dialog closes
            setSelectedCompetition(null);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        setDeleteDialogOpen(open);
        if (!open) {
            // Reset selected Competition setting when dialog closes
            setSelectedCompetition(null);
        }
    };

    const handleOpenUpdateDialog = (competition: Competition) => {
        setSelectedCompetition(competition);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdateDialogOpen(true);
        }, 0);
    };
    const handleOpenUpdatePhotoDialog = (competition: Competition) => {
        setSelectedCompetition(competition);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setUpdatePhotoDialogOpen(true);
        }, 0);
    };

    const handleOpenDeleteDialog = (competition: Competition) => {
        setSelectedCompetition(competition);
        // Small delay to allow dropdown to close before opening dialog
        setTimeout(() => {
            setDeleteDialogOpen(true);
        }, 0);
    };

    const columns: ColumnDef<Competition>[] = React.useMemo(
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
                accessorKey: 'banner',
                header: 'Banner',
                cell: ({ row }) => {
                    const sisterSchool = row.original;
                    return (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={sisterSchool.banner || '/placeholder.svg'} alt={sisterSchool.name} />
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
                    const competition = row.original;

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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(competition.id.toString())}>Copy ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenUpdateDialog(competition)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleOpenUpdatePhotoDialog(competition)}>
                                    <ImagePlus className="mr-2 h-4 w-4" />
                                    Update Photo
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleOpenDeleteDialog(competition)}
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
                            Add Competition
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
                                <TableHead>Banner</TableHead>
                                <TableHead>Name</TableHead>
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
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading Competition Data...</div>
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
                    <AddCompetition onSuccess={fetchCompetitions} />
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

            {selectedCompetition && (
                <>
                    {/* <UpdateCurriculumDialog
                        competition={selectedCompetition}
                        open={updateDialogOpen}
                        onOpenChange={handleUpdateDialogChange}
                        onSuccess={fetchCompetitions}
                    /> */}
                    <DeleteCompetitionDialog
                        competition={selectedCompetition}
                        open={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        onSuccess={fetchCompetitions}
                    />
                    <UpdateCompetitionPhotoDialog
                        competitionPhotos={selectedCompetition.related_photos}
                        competitionId={selectedCompetition.id}
                        open={updatePhotoDialogOpen}
                        onOpenChange={handleUpdatePhotoDialogChange}
                        onSuccess={fetchCompetitions}
                    />
                </>
            )}
        </div>
    );
}
