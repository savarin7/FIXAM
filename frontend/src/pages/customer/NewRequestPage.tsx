import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function NewRequestPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Request submitted!', description: 'An artisan will respond soon.' });
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold">Create Service Request</h1>
      <p className="mt-1 text-muted-foreground">Describe what you need and we'll match you with artisans</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl border border-border bg-card p-6 shadow-card">
        <div>
          <Label>Service Category</Label>
          <Select required>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c._id} value={c.name}>{c.icon} {c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">Request Title</Label>
          <Input id="title" placeholder="e.g., Fix leaking kitchen pipe" required />
        </div>
        <div>
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" placeholder="Describe the problem in detail..." rows={4} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="budget">Budget (₦)</Label>
            <Input id="budget" type="number" placeholder="15000" />
          </div>
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" />
          </div>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Your address" required />
        </div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  );
}
