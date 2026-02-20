import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <span className="text-sm font-bold text-primary-foreground">F</span>
              </div>
              <span className="font-display text-lg font-bold">Fixam</span>
            </div>
            <p className="text-sm text-muted-foreground">Connecting you with trusted local artisans for all your home service needs.</p>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/services" className="hover:text-foreground">Browse Services</Link>
              <Link to="/register" className="hover:text-foreground">Become an Artisan</Link>
              <Link to="/" className="hover:text-foreground">How It Works</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground">Help Center</span>
              <span className="cursor-pointer hover:text-foreground">Contact Us</span>
              <span className="cursor-pointer hover:text-foreground">FAQs</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground">Privacy Policy</span>
              <span className="cursor-pointer hover:text-foreground">Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 Fixam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
