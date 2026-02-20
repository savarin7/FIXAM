import { Star } from 'lucide-react';
import { mockReviews } from '@/lib/mockData';

export default function ArtisanReviewsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reviews Received</h1>
      <p className="mt-1 text-muted-foreground">What your customers are saying</p>

      <div className="mt-6 space-y-4">
        {mockReviews.map((r) => (
          <div key={r._id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.customer.name}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'fill-warning text-warning' : 'text-border'}`} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
            <p className="mt-2 text-xs text-muted-foreground">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
