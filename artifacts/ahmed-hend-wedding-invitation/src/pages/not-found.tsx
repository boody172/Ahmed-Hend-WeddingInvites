import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-8">Page Not Found</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background font-sans text-xs uppercase tracking-widest hover:bg-primary transition-colors duration-300"
        >
          Return to Invitation
        </Link>
      </div>
    </div>
  );
}
