import { NavLink } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import {
  MenuTrigger,
  Button,
  Menu,
  MenuItem,
  Popover
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
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }

    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isAccountMenuOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  // Handle escape key to close modals
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isSearchModalOpen) {
          setIsSearchModalOpen(false);
        } else if (isAccountMenuOpen) {
          setIsAccountMenuOpen(false);
        }
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isSearchModalOpen, isAccountMenuOpen]);

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
              onClick={() => setIsSearchModalOpen(true)}
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

            {/* Custom Account Menu with useState */}
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-11 transition-all duration-200"
                aria-label="Open account menu"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="hidden sm:block">My Account</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Menu Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                  <div className="p-1">
                    {/* User Info Header */}
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

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        console.log('Profile clicked');
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-md min-h-11"
                    >
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        console.log('Settings clicked');
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-md min-h-11"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        console.log('Help clicked');
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-md min-h-11"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </button>

                    <hr className="my-1 border-gray-200" />

                    <button
                      onClick={() => {
                        console.log('Logout clicked');
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-700 hover:bg-red-50 focus:bg-red-50 focus:outline-none rounded-md min-h-11"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-white bg-opacity-50 transition-opacity"
            onClick={() => setIsSearchModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden text-left bg-gray-50 rounded-xl  transition-all sm:my-8 w-full sm:max-w-2xl animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      Search
                    </h3>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Search for anything..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            console.log('Search:', e.currentTarget.value);
                            setIsSearchModalOpen(false);
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Press Enter to search or Escape to close
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    const input = searchInputRef.current;
                    if (input) {
                      console.log('Search:', input.value);
                      setIsSearchModalOpen(false);
                    }
                  }}
                >
                  Search
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                  onClick={() => setIsSearchModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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