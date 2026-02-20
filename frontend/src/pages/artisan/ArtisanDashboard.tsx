import { useAuth } from '@/contexts/AuthContext';
import { DollarSign, FileText, Star, TrendingUp } from 'lucide-react';
import { mockRequests } from '@/lib/mockData';

export default function ArtisanDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: 'Total Earnings', value: '₦245,000', icon: <DollarSign className="h-5 w-5 text-success" />, color: 'bg-success/10' },
    { label: 'Active Requests', value: 2, icon: <FileText className="h-5 w-5 text-primary" />, color: 'bg-primary/10' },
    { label: 'Avg Rating', value: '4.8', icon: <Star className="h-5 w-5 text-warning" />, color: 'bg-warning/10' },
    { label: 'This Month', value: '₦85,000', icon: <TrendingUp className="h-5 w-5 text-info" />, color: 'bg-info/10' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome, {user?.name?.split(' ')[0]}!</h1>
      <p className="mt-1 text-muted-foreground">Your artisan dashboard overview</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className={`rounded-lg p-2 ${s.color}`}>{s.icon}</div>
            </div>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold">Recent Incoming Requests</h2>
        <div className="mt-4 space-y-3">
          {mockRequests.slice(0, 2).map((r) => (
            <div key={r._id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div>
                <p className="font-medium">{r.description}</p>
                <p className="text-sm text-muted-foreground">From {r.customer.name} · {r.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                r.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'
              }`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
