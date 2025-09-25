import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Globe, Target, Heart, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 px-4">
          <div className="container mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                About <span className="text-primary">SpeakALA</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-4xl mx-auto">
                Preserving the unique vocabulary and culture of African Leadership Academy through a student-created
                digital dictionary.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                To create a comprehensive, student-driven dictionary that captures the unique language, slang, and
                cultural expressions that make African Leadership Academy special.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Preserve Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Document and preserve the unique vocabulary that emerges from our diverse, multicultural community
                    at ALA.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Build Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Help new students, faculty, and visitors understand and connect with our school's unique linguistic
                    landscape.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Celebrate Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Showcase how languages and cultures blend together to create something uniquely ALA in our
                    international community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About ALA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">About African Leadership Academy</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  African Leadership Academy is a pre-university institution that develops young leaders from across
                  Africa and beyond. Our diverse community brings together students from over 40 countries, creating a
                  rich tapestry of languages, cultures, and expressions.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  This unique environment naturally gives rise to new words, phrases, and expressions that blend
                  different languages and cultures. SpeakALA captures this linguistic evolution, making it accessible to
                  our entire community.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span>40+ Countries Represented</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Diverse Community</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Leadership Focus</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">Student Initiative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/90 leading-relaxed">
                      SpeakALA is entirely student-created and maintained. It represents our commitment to documenting
                      and sharing the unique aspects of our school culture with current and future members of the ALA
                      community.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                      Students contribute words and definitions through our simple submission form. Each entry is
                      reviewed to ensure accuracy and appropriateness before being added to the dictionary.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/contribute">Contribute a Word</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Join the Movement</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us build the most comprehensive dictionary of ALA vocabulary. Every word you contribute helps
              preserve our unique culture for future generations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contribute">Add a Word</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/browse">Browse Dictionary</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
