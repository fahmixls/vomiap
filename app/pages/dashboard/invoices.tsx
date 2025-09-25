import React, { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import UniversalTable, { EmptyState } from "~/components/ui/table";

// Invoice interface
interface Invoice {
  id: string;
  date: string;
  client: string;
  items: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft" | "cancelled";
  selected?: boolean;
}

// Sample invoice data
const sampleInvoiceData: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-01-15",
    client: "Acme Corporation",
    items: "Web Development Services",
    amount: 5500.0,
    status: "paid",
  },
  {
    id: "INV-002",
    date: "2024-01-20",
    client: "TechStart Inc.",
    items: "UI/UX Design, Mobile App",
    amount: 8750.0,
    status: "pending",
  },
  {
    id: "INV-003",
    date: "2024-01-25",
    client: "Global Solutions Ltd",
    items: "SEO Optimization Package",
    amount: 2200.0,
    status: "overdue",
  },
  {
    id: "INV-004",
    date: "2024-02-01",
    client: "StartupXYZ",
    items: "Brand Identity, Logo Design",
    amount: 3400.0,
    status: "paid",
  },
  {
    id: "INV-005",
    date: "2024-02-05",
    client: "Enterprise Corp",
    items: "Custom Software Development",
    amount: 15750.0,
    status: "pending",
  },
  {
    id: "INV-006",
    date: "2024-02-10",
    client: "Local Business Co",
    items: "Website Maintenance",
    amount: 450.0,
    status: "draft",
  },
  {
    id: "INV-007",
    date: "2024-02-12",
    client: "Innovation Hub",
    items: "Consulting Services",
    amount: 6800.0,
    status: "paid",
  },
  {
    id: "INV-008",
    date: "2024-02-15",
    client: "Digital Agency",
    items: "API Integration, Backend",
    amount: 4200.0,
    status: "overdue",
  },
  {
    id: "INV-009",
    date: "2024-02-18",
    client: "E-commerce Store",
    items: "Payment Gateway Setup",
    amount: 1850.0,
    status: "cancelled",
  },
  {
    id: "INV-010",
    date: "2024-02-20",
    client: "Media Company",
    items: "Content Management System",
    amount: 7200.0,
    status: "pending",
  },
  {
    id: "INV-011",
    date: "2024-02-22",
    client: "Healthcare Solutions",
    items: "Database Migration",
    amount: 5900.0,
    status: "paid",
  },
  {
    id: "INV-012",
    date: "2024-02-25",
    client: "Financial Services",
    items: "Security Audit, Fixes",
    amount: 8500.0,
    status: "draft",
  },
];

// Status Badge Component
const StatusBadge = ({ status }: { status: Invoice["status"] }) => {
  const getStatusStyles = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/10 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500";
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return (
          <svg className="size-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="size-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "overdue":
        return (
          <svg className="size-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg className="size-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${getStatusStyles(status)}`}
    >
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function InvoicePage() {
  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return (
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          );
        },
      },
      // Client column
      {
        accessorKey: "client",
        header: "Client",
        cell: ({ getValue }) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8">
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {(getValue() as string).charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {getValue() as string}
              </span>
            </div>
          </div>
        ),
      },
      // Items column
      {
        accessorKey: "items",
        header: "Items",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getValue() as string}
          </span>
        ),
      },
      // Amount column
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            $
            {(getValue() as number).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ),
      },
      // Status column
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <StatusBadge status={getValue() as Invoice["status"]} />
        ),
      },
    ],
    [],
  );

  const headerActions = (
    <>
      <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Create Invoice
      </button>
    </>
  );

  const customEmptyState = (
    <EmptyState
      title="No invoices found"
      description="Get started by creating your first invoice for your clients."
      actionButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => alert("Creating new invoice...")}
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Create Invoice
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          onClick={() => alert("Importing invoices...")}
        >
          Import Data
        </button>
      }
    />
  );

  return (
    <UniversalTable
      data={sampleInvoiceData}
      columns={columns}
      title="Invoices"
      description="Create, manage and track all your invoices in one place."
      headerActions={headerActions}
      emptyState={customEmptyState}
      onRowClick={(invoice) => {
        alert(`Clicked on invoice: ${invoice.id} - ${invoice.client}`);
      }}
      pageSize={8}
    />
  );
}
