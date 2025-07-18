import Link from 'next/link'

export default function SharedNavigationSimple() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 flex flex-1">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">PaintQuote Pro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/#features">
              Features
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">
              Pricing
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/roi-calculator">
              Resources
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Link
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            href="/access-code"
          >
            Sign In
          </Link>
          <Link
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            href="/trial-signup"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>
    </header>
  )
}