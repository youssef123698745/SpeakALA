import Link from "next/link"
import { BookOpen, Home, Info, Mail, Users, Settings } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">SpeakALA</h1>
              <p className="text-sm text-muted-foreground">African Leadership Academy Dictionary</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              href="/contribute"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Contribute</span>
            </Link>
            <Link
              href="/setup"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Setup</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
