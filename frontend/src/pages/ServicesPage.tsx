import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star } from 'lucide-react';
import { services, categories } from '@/lib/mockData';

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  const filtered = services.filter((s) => {
    const matchCategory = category === 'all' || s.category === category;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Browse Services</h1>
      <p className="mt-1 text-muted-foreground">Find the perfect artisan for your needs</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <Link key={service._id} to={`/services/${service._id}`} className="group rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
            <div className="h-40 rounded-t-xl bg-muted flex items-center justify-center text-4xl">
              {categories.find(c => c.name === service.category)?.icon || '🔧'}
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-primary">{service.category}</span>
              <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-muted-foreground">({service.reviewCount})</span>
                </div>
                <span className="font-display font-bold text-primary">₦{service.price.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">by {service.artisan.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-lg">No services found</p>
          <p className="mt-1 text-sm">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
