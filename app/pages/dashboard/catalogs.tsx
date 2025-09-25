import React, { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import UniversalTable, { EmptyState } from "~/components/ui/table";

// Catalog interface
interface Catalog {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  duration: string; // e.g., "1-2 weeks", "3-5 days"
  lastUsed: string;
  timesUsed: number;
  tags: string[];
  items: CatalogItem[];
  selected?: boolean;
}

interface CatalogItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Sample catalog data
const sampleCatalogData: Catalog[] = [
  {
    id: "CAT-001",
    title: "Website Design & Development",
    description:
      "Complete responsive website design and development with modern UI/UX",
    category: "Web Development",
    price: 2500.0,
    currency: "USD",
    duration: "2-3 weeks",
    lastUsed: "2024-02-20",
    timesUsed: 8,
    tags: ["responsive", "modern", "react", "tailwind"],
    items: [
      {
        id: "item-1",
        description: "UI/UX Design & Wireframes",
        quantity: 1,
        unitPrice: 800.0,
        total: 800.0,
      },
      {
        id: "item-2",
        description: "Frontend Development (React)",
        quantity: 1,
        unitPrice: 1200.0,
        total: 1200.0,
      },
      {
        id: "item-3",
        description: "Backend Integration & Testing",
        quantity: 1,
        unitPrice: 500.0,
        total: 500.0,
      },
    ],
  },
  {
    id: "CAT-002",
    title: "Logo Design Package",
    description:
      "Professional logo design with multiple concepts and revisions",
    category: "Graphic Design",
    price: 450.0,
    currency: "USD",
    duration: "5-7 days",
    lastUsed: "2024-02-18",
    timesUsed: 15,
    tags: ["branding", "vector", "creative", "concepts"],
    items: [
      {
        id: "item-1",
        description: "Initial Concept Development (3 options)",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
      {
        id: "item-2",
        description: "Revisions & Refinements",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        id: "item-3",
        description: "Final Logo Files (AI, PNG, SVG)",
        quantity: 1,
        unitPrice: 100.0,
        total: 100.0,
      },
    ],
  },
  {
    id: "CAT-003",
    title: "SEO Audit & Strategy",
    description:
      "Comprehensive SEO analysis with actionable improvement recommendations",
    category: "Digital Marketing",
    price: 750.0,
    currency: "USD",
    duration: "1 week",
    lastUsed: "2024-02-15",
    timesUsed: 6,
    tags: ["seo", "audit", "strategy", "analytics"],
    items: [
      {
        id: "item-1",
        description: "Technical SEO Audit",
        quantity: 1,
        unitPrice: 300.0,
        total: 300.0,
      },
      {
        id: "item-2",
        description: "Keyword Research & Analysis",
        quantity: 1,
        unitPrice: 250.0,
        total: 250.0,
      },
      {
        id: "item-3",
        description: "Strategy Report & Recommendations",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
  },
  {
    id: "CAT-004",
    title: "Content Writing - Blog Posts",
    description: "SEO-optimized blog posts with research and editing",
    category: "Content Creation",
    price: 125.0,
    currency: "USD",
    duration: "2-3 days",
    lastUsed: "2024-02-22",
    timesUsed: 22,
    tags: ["seo", "blog", "research", "editing"],
    items: [
      {
        id: "item-1",
        description: "Research & Topic Development",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
      {
        id: "item-2",
        description: "Writing (1000-1500 words)",
        quantity: 1,
        unitPrice: 75.0,
        total: 75.0,
      },
      {
        id: "item-3",
        description: "SEO Optimization & Editing",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
    ],
  },
  {
    id: "CAT-005",
    title: "Social Media Management",
    description: "Monthly social media content creation and management package",
    category: "Social Media",
    price: 800.0,
    currency: "USD",
    duration: "1 month",
    lastUsed: "2024-02-10",
    timesUsed: 4,
    tags: ["social", "content", "scheduling", "analytics"],
    items: [
      {
        id: "item-1",
        description: "Content Strategy & Calendar",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
      {
        id: "item-2",
        description: "Content Creation (20 posts)",
        quantity: 20,
        unitPrice: 25.0,
        total: 500.0,
      },
      {
        id: "item-3",
        description: "Scheduling & Analytics Report",
        quantity: 1,
        unitPrice: 100.0,
        total: 100.0,
      },
    ],
  },
  {
    id: "CAT-006",
    title: "Mobile App UI Design",
    description: "Complete mobile app interface design for iOS and Android",
    category: "Mobile Design",
    price: 1800.0,
    currency: "USD",
    duration: "2-4 weeks",
    lastUsed: "2024-01-28",
    timesUsed: 3,
    tags: ["mobile", "ui", "ios", "android"],
    items: [
      {
        id: "item-1",
        description: "User Flow & Wireframes",
        quantity: 1,
        unitPrice: 600.0,
        total: 600.0,
      },
      {
        id: "item-2",
        description: "UI Design (iOS)",
        quantity: 1,
        unitPrice: 600.0,
        total: 600.0,
      },
      {
        id: "item-3",
        description: "UI Design (Android) & Assets",
        quantity: 1,
        unitPrice: 600.0,
        total: 600.0,
      },
    ],
  },
];

export default function CatalogPage() {
  const columns = useMemo<ColumnDef<Catalog>[]>(
    () => [
      // Service Details column
      {
        accessorKey: "title",
        header: "Service",
        cell: ({ row }) => {
          const catalog = row.original;

          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {catalog.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {catalog.description}
                </div>
              </div>
            </div>
          );
        },
      },
      // Price & Duration column
      {
        accessorKey: "price",
        header: "Price & Duration",
        cell: ({ row }) => {
          const catalog = row.original;
          return (
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                ${catalog.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {catalog.duration}
              </div>
            </div>
          );
        },
      },
      // Usage Stats column
      {
        accessorKey: "timesUsed",
        header: "Usage",
        cell: ({ row }) => {
          const catalog = row.original;
          const lastUsedDate = new Date(catalog.lastUsed);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - lastUsedDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return (
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {catalog.timesUsed}x
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {diffDays === 1 ? "Yesterday" : `${diffDays} days ago`}
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filter
      </button>
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
        New Catalog
      </button>
    </div>
  );

  const customEmptyState = (
    <EmptyState
      title="No service catalogs found"
      description="Create your first service template to quickly generate invoices for recurring services."
      actionButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => alert("Creating new service catalog...")}
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
          Create First Catalog
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          onClick={() => alert("Importing service templates...")}
        >
          Import Templates
        </button>
      }
    />
  );

  return (
    <UniversalTable
      data={sampleCatalogData}
      columns={columns}
      title="Service Catalogs"
      description="Manage your service templates and quickly create invoices from recurring offerings."
      headerActions={headerActions}
      emptyState={customEmptyState}
      onRowClick={(catalog) => {
        alert(`Viewing catalog: ${catalog.title} - ${catalog.category}`);
      }}
      pageSize={8}
    />
  );
}
