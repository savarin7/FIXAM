import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/';
    const paths: Record<string, string> = { customer: '/customer', artisan: '/artisan', admin: '/admin' };
    return paths[user.role] || '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <span className="text-lg font-bold text-primary-foreground">F</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">Fixam</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link to="/services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Services</Link>
          {isAuthenticated ? (
            <>
              <Link to={getDashboardPath()} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
              <span className="text-sm text-muted-foreground">Hi, {user?.name?.split(' ')[0]}</span>
              <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
              <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Home</Link>
            <Link to="/services" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Services</Link>
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="text-sm font-medium">Dashboard</Link>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => { navigate('/login'); setMobileOpen(false); }}>Login</Button>
                <Button size="sm" onClick={() => { navigate('/register'); setMobileOpen(false); }}>Get Started</Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
