import { FileText, Bell, Clock, CheckCircle } from 'lucide-react';
import { mockRequests } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: 'Total Requests', value: 3, icon: <FileText className="h-5 w-5 text-primary" />, color: 'bg-primary/10' },
    { label: 'Pending', value: 1, icon: <Clock className="h-5 w-5 text-warning" />, color: 'bg-warning/10' },
    { label: 'Completed', value: 1, icon: <CheckCircle className="h-5 w-5 text-success" />, color: 'bg-success/10' },
    { label: 'Notifications', value: 2, icon: <Bell className="h-5 w-5 text-info" />, color: 'bg-info/10' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome, {user?.name?.split(' ')[0]}!</h1>
      <p className="mt-1 text-muted-foreground">Here's a summary of your activity</p>

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
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent Requests</h2>
          <Link to="/customer/requests" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="mt-4 space-y-3">
          {mockRequests.slice(0, 3).map((r) => (
            <div key={r._id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div>
                <p className="font-medium">{r.service.title}</p>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                r.status === 'pending' ? 'bg-warning/10 text-warning' :
                r.status === 'accepted' ? 'bg-info/10 text-info' :
                'bg-success/10 text-success'
              }`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
