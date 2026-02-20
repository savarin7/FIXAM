import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  LayoutDashboard, FileText, Star, User, Settings, Wrench,
  ChevronLeft, ChevronRight, LogOut, Menu, X, Users, FolderOpen, BarChart3, PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const customerNav: NavItem[] = [
  { label: 'Dashboard', path: '/customer', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'New Request', path: '/customer/new-request', icon: <PlusCircle className="h-5 w-5" /> },
  { label: 'My Requests', path: '/customer/requests', icon: <FileText className="h-5 w-5" /> },
  { label: 'Leave Review', path: '/customer/review', icon: <Star className="h-5 w-5" /> },
  { label: 'Profile', path: '/customer/profile', icon: <User className="h-5 w-5" /> },
];

const artisanNav: NavItem[] = [
  { label: 'Dashboard', path: '/artisan', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'My Services', path: '/artisan/services', icon: <Wrench className="h-5 w-5" /> },
  { label: 'Requests', path: '/artisan/requests', icon: <FileText className="h-5 w-5" /> },
  { label: 'Reviews', path: '/artisan/reviews', icon: <Star className="h-5 w-5" /> },
  { label: 'Profile', path: '/artisan/profile', icon: <User className="h-5 w-5" /> },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Categories', path: '/admin/categories', icon: <FolderOpen className="h-5 w-5" /> },
  { label: 'Services', path: '/admin/services', icon: <Wrench className="h-5 w-5" /> },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = user?.role === 'admin' ? adminNav : user?.role === 'artisan' ? artisanNav : customerNav;
  const roleLabel = user?.role === 'admin' ? 'Admin' : user?.role === 'artisan' ? 'Artisan' : 'Customer';

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary">
          <span className="text-lg font-bold text-primary-foreground">F</span>
        </div>
        {!collapsed && <span className="font-display text-lg font-bold text-sidebar-foreground">Fixam</span>}
      </div>

      {!collapsed && (
        <div className="mx-4 mb-4 rounded-lg bg-sidebar-accent px-3 py-2">
          <p className="text-xs text-sidebar-foreground/60">Logged in as</p>
          <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name}</p>
          <span className="mt-1 inline-block rounded-full bg-sidebar-primary/20 px-2 py-0.5 text-xs font-medium text-sidebar-primary">
            {roleLabel}
          </span>
        </div>
      )}

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop sidebar */}
      <aside className={`hidden flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 md:flex ${collapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-3 flex items-center justify-center rounded-lg border border-sidebar-border p-2 text-sidebar-foreground/50 hover:text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-sidebar">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to Home</Link>
        </header>
        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
