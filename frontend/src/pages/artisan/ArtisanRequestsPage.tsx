import { Button } from '@/components/ui/button';
import { mockRequests } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function ArtisanRequestsPage() {
  const { toast } = useToast();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Incoming Requests</h1>
      <p className="mt-1 text-muted-foreground">Accept or reject service requests from customers</p>

      <div className="mt-6 space-y-4">
        {mockRequests.map((r) => (
          <div key={r._id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold">{r.description}</h3>
                <p className="text-sm text-muted-foreground">From {r.customer.name} · {r.date}</p>
                <p className="mt-1 text-sm">Budget: <span className="font-medium text-primary">₦{r.budget.toLocaleString()}</span></p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                r.status === 'pending' ? 'bg-warning/10 text-warning' :
                r.status === 'accepted' ? 'bg-info/10 text-info' :
                'bg-success/10 text-success'
              }`}>{r.status}</span>
            </div>
            {r.status === 'pending' && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => toast({ title: 'Request accepted!' })}>Accept</Button>
                <Button size="sm" variant="outline" onClick={() => toast({ title: 'Request rejected', variant: 'destructive' })}>Reject</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
