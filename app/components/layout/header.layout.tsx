import { NavLink } from 'react-router';
import {
  MenuTrigger,
  Button,
  Menu,
  MenuItem,
  Popover,
  Separator
} from 'react-aria-components';
import {
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search
} from 'lucide-react';

export function HeaderLayout() {
  const navigationItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/invoices', label: 'Invoices' },
    { to: '/clients', label: 'Clients' },
    { to: '/catalogs', label: 'Catalogs' }
  ];

  return (
    <header
      className="bg-white border-b border-gray-200 shadow-sm"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg p-2 -ml-2"
              aria-label="Go to homepage"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Business App
              </span>
            </NavLink>
          </div>
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2
                  min-h-11 min-w-11 flex items-center justify-center
                  ${isActive
                    ? 'bg-blue-100 text-blue-900 border-2 border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-2 border-transparent'
                  }
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-11 min-w-11 flex items-center justify-center"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-11 min-w-11 flex items-center justify-center relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                aria-hidden="true"
              />
              <span className="sr-only">2 unread notifications</span>
            </Button>
            <MenuTrigger>
              <Button
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-11"
                aria-label="Open account menu"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="hidden sm:block">My Account</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>

              <Popover
                className="
                  min-w-56 bg-white border border-gray-200 rounded-lg shadow-lg 
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  entering:animate-in entering:fade-in entering:zoom-in-95
                  exiting:animate-out exiting:fade-out exiting:zoom-out-95
                "
                placement="bottom end"
              >
                <Menu
                  className="p-1 focus:outline-none"
                  aria-label="Account menu"
                >
                  <div className="px-3 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@company.com</p>
                      </div>
                    </div>
                  </div>
                  <MenuItem
                    className="
                      flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 
                      hover:bg-gray-100 focus:bg-gray-100 focus:outline-none 
                      rounded-md cursor-pointer min-h-11
                    "
                    onAction={() => console.log('Profile clicked')}
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </MenuItem>
                  <MenuItem
                    className="
                      flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 
                      hover:bg-gray-100 focus:bg-gray-100 focus:outline-none 
                      rounded-md cursor-pointer min-h-11
                    "
                    onAction={() => console.log('Settings clicked')}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </MenuItem>
                  <MenuItem
                    className="
                      flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 
                      hover:bg-gray-100 focus:bg-gray-100 focus:outline-none 
                      rounded-md cursor-pointer min-h-11
                    "
                    onAction={() => console.log('Help clicked')}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </MenuItem>

                  <Separator className="my-1 border-t border-gray-200" />

                  <MenuItem
                    className="
                      flex items-center space-x-3 px-3 py-2 text-sm text-red-700 
                      hover:bg-red-50 focus:bg-red-50 focus:outline-none 
                      rounded-md cursor-pointer min-h-11
                    "
                    onAction={() => console.log('Logout clicked')}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </MenuItem>
                </Menu>
              </Popover>
            </MenuTrigger>
            <div className="md:hidden">
              <MenuTrigger>
                <Button
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-11 min-w-11 flex items-center justify-center"
                  aria-label="Open mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
                <Popover
                  className="
                    w-64 bg-white border border-gray-200 rounded-lg shadow-lg
                    focus:outline-none focus:ring-4 focus:ring-blue-300
                    entering:animate-in entering:fade-in entering:slide-in-from-top-5
                    exiting:animate-out exiting:fade-out exiting:slide-out-to-top-5
                  "
                  placement="bottom end"
                >
                  <Menu
                    className="p-2 focus:outline-none"
                    aria-label="Mobile navigation menu"
                  >
                    {navigationItems.map((item) => (
                      <MenuItem
                        key={item.to}
                        className="
                          block px-3 py-3 text-base font-semibold text-gray-700 
                          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none 
                          rounded-md cursor-pointer min-h-11
                        "
                        onAction={() => {
                          // Navigate to the route
                          window.location.href = item.to;
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Popover>
              </MenuTrigger>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Link - Hidden by default, visible on focus */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
          bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2
          z-50
        "
      >
        Skip to main content
      </a>
    </header>
  );
}