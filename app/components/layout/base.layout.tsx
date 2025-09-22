import type { PropsWithChildren } from "react";
import { HeaderLayout } from "./header.layout";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderLayout />
            <main
                id="main-content"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                role="main"
                tabIndex={-1}
            >
                {children}
            </main>
        </div>
    );
}