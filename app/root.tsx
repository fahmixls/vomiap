import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "@/app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-lg leading-relaxed antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:font-bold"
        >
          Skip to main content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div role="application" aria-label="Main application">
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      id="main-content"
      className="pt-16 p-4 container mx-auto"
      role="main"
      aria-labelledby="error-heading"
    >
      <h1
        id="error-heading"
        className="text-3xl font-bold mb-4 text-red-600 max-w-prose"
      >
        {message}
      </h1>
      <p className="text-lg mb-6 max-w-prose" role="alert" aria-live="polite">
        {details}
      </p>
      {stack && (
        <section aria-labelledby="stack-heading" className="mb-8">
          <h2 id="stack-heading" className="text-xl font-bold mb-2">
            Technical Details
          </h2>
          <pre
            className="w-full p-4 overflow-x-auto bg-gray-100 border border-gray-300 rounded text-sm leading-normal"
            role="region"
            aria-label="Error stack trace"
            tabIndex={0}
          >
            <code>{stack}</code>
          </pre>
        </section>
      )}
      <nav aria-label="Error page navigation">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded font-bold min-h-11 min-w-11 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-describedby="home-link-desc"
        >
          Return to Home
        </a>
        <span id="home-link-desc" className="sr-only">
          Navigate back to the home page
        </span>
      </nav>
    </main>
  );
}
