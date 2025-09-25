import {
  type RouteConfig,
  index,
  prefix,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  layout("components/layout/base.layout.tsx", [
    route("dashboard", "pages/dashboard/index.tsx"),
    route("invoices", "pages/dashboard/invoices.tsx"),
    route("clients", "pages/dashboard/clients.tsx"),
    route("catalogs", "pages/dashboard/catalogs.tsx"),
  ]),
] satisfies RouteConfig;
