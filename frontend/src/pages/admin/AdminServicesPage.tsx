import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { services } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function AdminServicesPage() {
  const { toast } = useToast();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Services</h1>
      <p className="mt-1 text-muted-foreground">Oversee all services listed on the platform</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Service</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Artisan</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {services.map((s) => (
              <tr key={s._id}>
                <td className="px-4 py-3 font-medium">{s.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.artisan.name}</td>
                <td className="px-4 py-3 font-medium">₦{s.price.toLocaleString()}</td>
                <td className="px-4 py-3 flex gap-1">
                  <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => toast({ title: 'Service removed' })}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
