import { mockRequests } from '@/lib/mockData';

export default function CustomerRequestsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Requests</h1>
      <p className="mt-1 text-muted-foreground">Track the status of your service requests</p>

      <div className="mt-6 space-y-4">
        {mockRequests.map((r) => (
          <div key={r._id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold">{r.service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">Requested on {r.date} · Budget: ₦{r.budget.toLocaleString()}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                r.status === 'pending' ? 'bg-warning/10 text-warning' :
                r.status === 'accepted' ? 'bg-info/10 text-info' :
                'bg-success/10 text-success'
              }`}>
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
