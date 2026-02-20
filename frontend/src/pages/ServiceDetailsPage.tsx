import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { services, mockReviews, categories } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const service = services.find((s) => s._id === id);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-primary hover:underline">← Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/services" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Services
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-64 rounded-xl bg-muted flex items-center justify-center text-6xl">
            {categories.find(c => c.name === service.category)?.icon || '🔧'}
          </div>
          <span className="mt-4 inline-block text-sm font-medium text-primary">{service.category}</span>
          <h1 className="mt-1 font-display text-3xl font-bold">{service.title}</h1>
          <p className="mt-3 text-muted-foreground">{service.description}</p>

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold">Reviews</h2>
            <div className="mt-4 space-y-4">
              {mockReviews.map((r) => (
                <div key={r._id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.customer.name}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="font-display text-3xl font-bold text-primary">₦{service.price.toLocaleString()}</p>

            <div className="my-5 border-t border-border" />

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                {service.artisan.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{service.artisan.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {service.artisan.location}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{service.artisan.rating}</span>
              <span className="text-xs text-muted-foreground">({service.artisan.reviews} reviews)</span>
              <span className="text-xs text-muted-foreground">· {service.artisan.yearsExp} yrs exp</span>
            </div>

            <div className="mt-5">
              {isAuthenticated ? (
                <Link to="/customer/new-request">
                  <Button className="w-full gradient-primary text-primary-foreground">Request This Service</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="w-full gradient-primary text-primary-foreground">Login to Request</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
