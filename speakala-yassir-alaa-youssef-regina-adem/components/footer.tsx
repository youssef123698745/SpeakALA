import Link from "next/link"
import { BookOpen, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">SpeakALA</h3>
                <p className="text-sm text-muted-foreground">ALA Dictionary</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preserving and sharing the unique vocabulary of African Leadership Academy, created by students for the
              community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About ALA
              </Link>
              <Link
                href="/contribute"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Add a Word
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Community</h4>
            <p className="text-sm text-muted-foreground">
              This dictionary is a collaborative effort by ALA students to document our unique school culture and
              language.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-secondary fill-current" />
              <span>by ALA students</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SpeakALA - African Leadership Academy Dictionary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
