import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockUsers = [
  { _id: '1', name: 'John Customer', email: 'john@test.com', role: 'customer', status: 'active' },
  { _id: '2', name: 'Sarah Artisan', email: 'sarah@test.com', role: 'artisan', status: 'active' },
  { _id: '3', name: 'Mike Builder', email: 'mike@test.com', role: 'artisan', status: 'active' },
  { _id: '4', name: 'Jane Doe', email: 'jane@test.com', role: 'customer', status: 'suspended' },
  { _id: '5', name: 'Emeka O.', email: 'emeka@test.com', role: 'customer', status: 'active' },
];

export default function ManageUsersPage() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Users</h1>
      <p className="mt-1 text-muted-foreground">View and manage platform users</p>

      <div className="relative mt-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {filtered.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3"><Badge variant="secondary" className="capitalize">{u.role}</Badge></td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.status === 'active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => toast({ title: `User ${u.name} removed` })}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
