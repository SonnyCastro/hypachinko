"use client"

import React, { useState, useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/Button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  itemsPerPage?: number
  responsiveBreakpoints?: {
    mobile?: string[]
    tablet?: string[]
    desktop?: string[]
  }
}

// Extend the column meta type to include our custom properties
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> {
    width?: string
    flex?: string
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  itemsPerPage = 10,
  responsiveBreakpoints,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  // Set up responsive column visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const newVisibility: VisibilityState = {}

      columns.forEach((column) => {
        const columnId =
          column.id ||
          (("accessorKey" in column ? column.accessorKey : "") as string)

        if (width < 640 && responsiveBreakpoints?.mobile) {
          // Mobile: only show specified columns
          newVisibility[columnId] =
            responsiveBreakpoints.mobile.includes(columnId)
        } else if (width < 1024 && responsiveBreakpoints?.tablet) {
          // Tablet: show tablet columns
          newVisibility[columnId] =
            responsiveBreakpoints.tablet.includes(columnId)
        } else {
          // Desktop: show all columns
          newVisibility[columnId] = true
        }
      })

      setColumnVisibility(newVisibility)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [columns, responsiveBreakpoints])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: itemsPerPage,
      },
    },
  })

  return (
    <div className='w-full'>
      {/* Table Container with Custom Styling */}
      <div className='relative rounded-2xl w-full'>
        <div className='flex flex-col items-start justify-start overflow-hidden w-full'>
          {/* Custom Table Header */}
          <div className='bg-[var(--color-figma-dark-200)] flex flex-row items-center justify-start px-0 py-3 sm:py-4 relative w-full'>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => {
                if (!header.isPlaceholder && header.column.getIsVisible()) {
                  return (
                    <div
                      key={header.id}
                      className='flex flex-row gap-1 sm:gap-2.5 items-center justify-center px-2 sm:px-4 py-0 relative'
                      style={{
                        width: header.column.columnDef.meta?.width || "auto",
                        flex: header.column.columnDef.meta?.flex || "none",
                      }}
                    >
                      <div className='absolute border-[var(--color-figma-green-400)] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none' />
                      <div
                        className='text-instrument font-normal text-sm sm:text-lg md:text-xl lg:text-2xl text-[var(--color-figma-green-400)] text-center text-nowrap'
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </div>
                  )
                }
                return null
              })
            )}
          </div>

          {/* Table Body */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className='flex flex-row h-[60px] sm:h-[72px] items-center justify-start relative w-full'
              >
                <div className='absolute border-[var(--color-figma-dark-200)] border-[0px_0px_1px] border-solid inset-0 pointer-events-none' />
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className='flex flex-row gap-1 sm:gap-2.5 h-full items-center justify-center overflow-hidden px-2 sm:px-4 py-1 sm:py-2 relative'
                    style={{
                      width: cell.column.columnDef.meta?.width || "auto",
                      flex: cell.column.columnDef.meta?.flex || "none",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className='flex flex-row h-[60px] sm:h-[72px] items-center justify-center relative w-full'>
              <div className='text-instrument font-normal text-sm sm:text-lg text-[#dedede] text-center'>
                No results.
              </div>
            </div>
          )}
        </div>
        <div className='absolute border border-[var(--color-figma-dark-200)] border-solid inset-0 pointer-events-none rounded-2xl' />
      </div>

      {/* Custom Pagination */}
      <div className='flex flex-col sm:flex-row items-center justify-between p-4 gap-4 relative w-full'>
        <div className='text-instrument font-normal text-base sm:text-lg md:text-xl text-[#dedede] text-center text-nowrap'>
          {table.getFilteredRowModel().rows.length} results
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='text-[var(--color-figma-green-400)] border-[var(--color-figma-green-400)] hover:bg-[var(--color-figma-dark-200)] disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 text-sm'
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='hidden sm:inline ml-1'>Previous</span>
          </Button>
          <div className='text-instrument font-normal text-sm sm:text-base text-[#dedede] px-2'>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='text-[var(--color-figma-green-400)] border-[var(--color-figma-green-400)] hover:bg-[var(--color-figma-dark-200)] disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 text-sm'
          >
            <span className='hidden sm:inline mr-1'>Next</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
