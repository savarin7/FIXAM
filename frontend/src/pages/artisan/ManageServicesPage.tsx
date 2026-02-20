import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { services, categories } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function ManageServicesPage() {
  const { toast } = useToast();
  const myServices = services.slice(0, 3);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Services</h1>
          <p className="mt-1 text-muted-foreground">Manage your service offerings</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Service</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast({ title: 'Service created!' }); }}>
              <div><Label>Title</Label><Input placeholder="Service title" required /></div>
              <div>
                <Label>Category</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Price (₦)</Label><Input type="number" placeholder="15000" required /></div>
              <div><Label>Description</Label><Textarea placeholder="Describe your service..." rows={3} required /></div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground">Create Service</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-4">
        {myServices.map((s) => (
          <div key={s._id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-card">
            <div>
              <h3 className="font-display font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.category} · ₦{s.price.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
