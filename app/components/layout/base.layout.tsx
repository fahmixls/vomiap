import { HeaderLayout } from "./header.layout";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLayout />
      <main
        id="main-content"
        className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8 my-8 bg-white rounded-lg shadow-sm"
        role="main"
        tabIndex={-1}
      >
        <Outlet />
      </main>
    </div>
  );
}
