import React, { useState, type ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

export interface StatusBadgeProps {
  status: string;
}

export interface ActionButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionButton?: ReactNode;
  secondaryButton?: ReactNode;
}

export interface UniversalTableProps<T = any> {
  data?: T[];
  columns?: ColumnDef<T, any>[];
  title?: string;
  description?: string;
  headerActions?: ReactNode;
  emptyState?: ReactNode;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  className?: string;
  loading?: boolean;
}

// Empty State Component
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "No data available",
  description = "There are no records to display at the moment.",
  actionButton,
  secondaryButton,
}) => (
  <div className="max-w-screen-lg w-full min-h-96 flex flex-col justify-center mx-auto px-6 py-4">
    <div className="flex justify-center items-center size-11 bg-gray-100 rounded-lg dark:bg-neutral-800 mx-auto">
      {icon || (
        <svg
          className="shrink-0 size-6 text-gray-600 dark:text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
        </svg>
      )}
    </div>

    <h2 className="mt-5 font-semibold text-gray-800 dark:text-white text-center">
      {title}
    </h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
      {description}
    </p>

    {(actionButton || secondaryButton) && (
      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
        {actionButton}
        {secondaryButton}
      </div>
    )}
  </div>
);

// Main Universal Table Component
export const UniversalTable = <T extends Record<string, any> = any>({
  data = [],
  columns = [],
  title = "Data Table",
  description = "Manage your data with this table.",
  headerActions,
  emptyState,
  pagination = true,
  pageSize = 10,
  onRowClick,
  className = "",
  loading = false,
}: UniversalTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const isEmpty = data.length === 0;

  return (
    <div className={`max-w-screen-lg mx-auto ${className} flex flex-col`}>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div>
            {/* Header */}
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {description}
                </p>
              </div>
              {headerActions && (
                <div className="inline-flex gap-x-2">{headerActions}</div>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="min-h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : isEmpty ? (
              emptyState || <EmptyState />
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-900">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-start cursor-pointer select-none"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </span>
                              {header.column.getIsSorted() && (
                                <div className="text-gray-500 dark:text-neutral-500">
                                  {header.column.getIsSorted() === "desc"
                                    ? " ↓"
                                    : " ↑"}
                                </div>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 cursor-pointer"
                        onClick={() => onRowClick?.(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="size-px whitespace-nowrap"
                          >
                            <div className="block px-6 py-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer with Pagination */}
                {pagination && (
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        <span className="font-semibold text-gray-800 dark:text-neutral-200">
                          {table.getFilteredRowModel().rows.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <svg
                          className="size-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.506 1.64001L4.85953 7.28646C4.66427 7.48172 4.66427 7.79831 4.85953 7.99357L10.506 13.64"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Prev
                      </button>
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        Next
                        <svg
                          className="size-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.50598 2L10.1524 7.64645C10.3477 7.84171 10.3477 8.15829 10.1524 8.35355L4.50598 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalTable;
