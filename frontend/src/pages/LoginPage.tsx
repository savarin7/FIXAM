import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: 'Welcome back!' });
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem('fixam_user') || '{}');
      const paths: Record<string, string> = { customer: '/customer', artisan: '/artisan', admin: '/admin' };
      navigate(paths[user.role] || '/');
    } catch {
      toast({ title: 'Login failed', description: 'Invalid email or password', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-elevated">
          <h1 className="font-display text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Fixam account</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
          </p>

          <div className="mt-6 rounded-lg bg-muted p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Demo Accounts:</p>
            <p className="text-xs text-muted-foreground">customer@fixam.com / password</p>
            <p className="text-xs text-muted-foreground">artisan@fixam.com / password</p>
            <p className="text-xs text-muted-foreground">admin@fixam.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
