import { Users, Wrench, FileText, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { platformStats } from '@/lib/mockData';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: platformStats.totalUsers.toLocaleString(), icon: <Users className="h-5 w-5 text-primary" />, color: 'bg-primary/10' },
    { label: 'Artisans', value: platformStats.totalArtisans.toLocaleString(), icon: <Wrench className="h-5 w-5 text-accent" />, color: 'bg-accent/10' },
    { label: 'Services', value: platformStats.totalServices.toLocaleString(), icon: <FileText className="h-5 w-5 text-info" />, color: 'bg-info/10' },
    { label: 'Total Requests', value: platformStats.totalRequests.toLocaleString(), icon: <BarChart3 className="h-5 w-5 text-warning" />, color: 'bg-warning/10' },
    { label: 'Revenue', value: `₦${(platformStats.totalRevenue / 1000000).toFixed(1)}M`, icon: <DollarSign className="h-5 w-5 text-success" />, color: 'bg-success/10' },
    { label: 'Monthly Growth', value: `${platformStats.monthlyGrowth}%`, icon: <TrendingUp className="h-5 w-5 text-primary" />, color: 'bg-primary/10' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Platform overview and statistics</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
