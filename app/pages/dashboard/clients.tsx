import React, { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import UniversalTable, { EmptyState } from "~/components/ui/table";

// Client interface
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalInvoices: number;
  totalValue: number;
  lastActivity: string;
  selected?: boolean;
}

// Sample client data
const sampleClientData: Client[] = [
  {
    id: "CLI-001",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    totalInvoices: 8,
    totalValue: 45200.0,
    lastActivity: "2024-02-20",
  },
  {
    id: "CLI-002",
    name: "Sarah Johnson",
    email: "sarah@techstart.io",
    phone: "+1 (555) 234-5678",
    company: "TechStart Inc.",
    totalInvoices: 12,
    totalValue: 78500.0,
    lastActivity: "2024-02-18",
  },
  {
    id: "CLI-003",
    name: "Michael Brown",
    email: "m.brown@globalsolutions.com",
    phone: "+1 (555) 345-6789",
    company: "Global Solutions Ltd",
    totalInvoices: 5,
    totalValue: 28900.0,
    lastActivity: "2024-01-15",
  },
  {
    id: "CLI-004",
    name: "Emily Davis",
    email: "emily@startupxyz.com",
    phone: "+1 (555) 456-7890",
    company: "StartupXYZ",
    totalInvoices: 3,
    totalValue: 15600.0,
    lastActivity: "2024-02-15",
  },
  {
    id: "CLI-005",
    name: "Robert Wilson",
    email: "rwilson@enterprise.corp",
    phone: "+1 (555) 567-8901",
    company: "Enterprise Corp",
    totalInvoices: 15,
    totalValue: 125000.0,
    lastActivity: "2024-02-22",
  },
  {
    id: "CLI-006",
    name: "Lisa Chen",
    email: "lisa@localbusiness.co",
    phone: "+1 (555) 678-9012",
    company: "Local Business Co",
    totalInvoices: 2,
    totalValue: 1200.0,
    lastActivity: "2023-12-10",
  },
  {
    id: "CLI-007",
    name: "David Martinez",
    email: "david@innovationhub.com",
    phone: "+1 (555) 789-0123",
    company: "Innovation Hub",
    totalInvoices: 7,
    totalValue: 52400.0,
    lastActivity: "2024-02-19",
  },
  {
    id: "CLI-008",
    name: "Jennifer Taylor",
    email: "j.taylor@digitalagency.net",
    phone: "+1 (555) 890-1234",
    company: "Digital Agency",
    totalInvoices: 9,
    totalValue: 38700.0,
    lastActivity: "2024-02-12",
  },
  {
    id: "CLI-009",
    name: "Alex Thompson",
    email: "alex@ecommercestore.com",
    phone: "+1 (555) 901-2345",
    company: "E-commerce Store",
    totalInvoices: 1,
    totalValue: 850.0,
    lastActivity: "2024-01-28",
  },
  {
    id: "CLI-010",
    name: "Maria Garcia",
    email: "maria@mediacompany.tv",
    phone: "+1 (555) 012-3456",
    company: "Media Company",
    totalInvoices: 4,
    totalValue: 22800.0,
    lastActivity: "2024-02-25",
  },
];

export default function ClientPage() {
  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      // Client Name & Company column
      {
        accessorKey: "name",
        header: "Client",
        cell: ({ row }) => {
          const client = row.original;
          const initials = client.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {initials}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {client.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {client.company}
                </div>
              </div>
            </div>
          );
        },
      },
      // Contact Info column
      {
        accessorKey: "email",
        header: "Contact",
        cell: ({ row }) => {
          const client = row.original;
          return (
            <div>
              <div className="text-sm text-gray-900 dark:text-gray-100">
                {client.email}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {client.phone}
              </div>
            </div>
          );
        },
      },
      // Total Invoices column
      {
        accessorKey: "totalInvoices",
        header: "Invoices",
        cell: ({ getValue, row }) => {
          const client = row.original;
          return (
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {getValue() as number}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                ${client.totalValue.toLocaleString()}
              </div>
            </div>
          );
        },
      },
      // Last Activity column
      {
        accessorKey: "lastActivity",
        header: "Last Activity",
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - date.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return (
            <div>
              <div className="text-sm text-gray-900 dark:text-gray-100">
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {diffDays === 1 ? "1 day ago" : `${diffDays} days ago`}
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  const headerActions = (
    <div className="flex gap-2">
      <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
        <svg
          className="shrink-0 size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Export
      </button>
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
        Add Client
      </button>
    </div>
  );

  const customEmptyState = (
    <EmptyState
      title="No clients found"
      description="Start building relationships by adding your first client to the system."
      actionButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => alert("Adding new client...")}
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
          Add Client
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          onClick={() => alert("Importing clients...")}
        >
          Import Contacts
        </button>
      }
    />
  );

  return (
    <UniversalTable
      data={sampleClientData}
      columns={columns}
      title="Clients"
      description="Manage your client relationships and track business opportunities."
      headerActions={headerActions}
      emptyState={customEmptyState}
      onRowClick={(client) => {
        alert(`Viewing client: ${client.name} from ${client.company}`);
      }}
      pageSize={8}
    />
  );
}
