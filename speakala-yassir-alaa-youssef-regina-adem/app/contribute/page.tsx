"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WordForm } from "@/components/word-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Heart, CheckCircle, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"

export default function ContributePage() {
  const handleWordAdded = () => {
    // Could add navigation or other success actions here
    console.log("Word added successfully!")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-12 px-4">
          <div className="container mx-auto text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Help Build <span className="text-primary">SpeakALA</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Share the unique words and phrases that make African Leadership Academy special. Your contributions help
                preserve our school's culture for future generations.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Student Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Community Resource</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Made with Love</span>
              </div>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Contribution Guidelines</h2>
              <p className="text-muted-foreground text-lg">
                Help us maintain a high-quality dictionary by following these simple guidelines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Be Accurate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provide clear, accurate definitions that truly reflect how the word is used at ALA.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Add Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Include examples and pronunciation guides to help others understand and use the word correctly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Stay Respectful</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ensure all contributions are appropriate and reflect the positive values of our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Word Form Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <WordForm onSuccess={handleWordAdded} />
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Questions About Contributing?</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              We're here to help! If you have questions about adding words or need assistance, don't hesitate to reach
              out to our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
