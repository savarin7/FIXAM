import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import { categories, featuredArtisans } from '@/lib/mockData';
import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container relative mx-auto px-4">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.h1 variants={fadeUp} custom={0} className="font-display text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              Find Trusted Artisans<br />
              <span className="text-accent">Near You</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/70">
              Fixam connects you with verified local professionals for plumbing, electrical, carpentry, and more. Quality service, guaranteed.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/services">
                <Button size="lg" className="gradient-primary text-primary-foreground px-8 shadow-glow">
                  Browse Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Join as Artisan
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold">Popular Categories</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">Browse services across all major home repair and improvement categories</p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div key={cat._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/services?category=${cat.name}`} className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="mt-3 font-display font-semibold text-card-foreground">{cat.name}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{cat.count} artisans</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold">How Fixam Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: <Search className="h-8 w-8 text-primary" />, title: 'Search & Discover', desc: 'Browse categories or search for the exact service you need.' },
              { icon: <Clock className="h-8 w-8 text-primary" />, title: 'Book & Schedule', desc: 'Send a request to your chosen artisan and agree on timing.' },
              { icon: <Shield className="h-8 w-8 text-primary" />, title: 'Get It Done', desc: 'Your artisan completes the job. Pay securely and leave a review.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-card">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">{step.icon}</div>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured artisans */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold">Top-Rated Artisans</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">Professionals with outstanding track records and verified skills</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArtisans.map((a) => (
              <div key={a._id} className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="mt-3 font-display font-semibold">{a.name}</h3>
                <p className="text-sm text-muted-foreground">{a.category} · {a.location}</p>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{a.rating}</span>
                  <span className="text-xs text-muted-foreground">({a.reviews} reviews)</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.yearsExp} years experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">Join thousands of satisfied customers and skilled artisans on Fixam.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
                Create Account
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
