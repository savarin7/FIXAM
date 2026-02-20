import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LeaveReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Review submitted!', description: 'Thank you for your feedback.' });
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold">Leave a Review</h1>
      <p className="mt-1 text-muted-foreground">Share your experience with the artisan</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl border border-border bg-card p-6 shadow-card">
        <div>
          <Label>Rating</Label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
                <Star className={`h-8 w-8 transition-colors ${(hover || rating) >= s ? 'fill-warning text-warning' : 'text-border'}`} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="comment">Your Review</Label>
          <Textarea id="comment" placeholder="Tell us about your experience..." rows={4} required />
        </div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground">Submit Review</Button>
      </form>
    </div>
  );
}
