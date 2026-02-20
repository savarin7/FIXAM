import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { categories } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function ManageCategoriesPage() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Manage Categories</h1>
          <p className="mt-1 text-muted-foreground">Add, edit, or remove service categories</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="mr-2 h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast({ title: 'Category created!' }); }}>
              <div><Label>Name</Label><Input placeholder="Category name" required /></div>
              <div><Label>Icon (emoji)</Label><Input placeholder="🔧" required /></div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <div key={c._id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} artisans</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
