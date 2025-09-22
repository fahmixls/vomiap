import { type RouteConfig, index, prefix, layout } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  ...prefix("dashboard", [layout("components/layout/base.layout.tsx", [index("pages/dashboard/index.tsx")])]),
] satisfies RouteConfig;
