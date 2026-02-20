import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, role);
      toast({ title: 'Account created!' });
      const paths: Record<string, string> = { customer: '/customer', artisan: '/artisan', admin: '/admin' };
      navigate(paths[role] || '/');
    } catch {
      toast({ title: 'Registration failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-elevated">
          <h1 className="font-display text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join Fixam as a customer or artisan</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>

            <div>
              <Label>I want to</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {(['customer', 'artisan'] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`rounded-lg border-2 p-4 text-center transition-all ${
                      role === r ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-2xl">{r === 'customer' ? '🏠' : '🔧'}</span>
                    <p className="mt-1 text-sm font-medium capitalize">{r === 'customer' ? 'Hire Services' : 'Offer Services'}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
