import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Users, BookOpen } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 px-4">
          <div className="container mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Have questions, suggestions, or want to get involved with SpeakALA? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">For general inquiries, suggestions, or technical issues</p>
                  <Button asChild className="w-full">
                    <a href="mailto:speakala@africanleadershipacademy.org">speakala@africanleadershipacademy.org</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Join the Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Connect with other contributors and discuss ALA vocabulary</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Quick answers to common questions about SpeakALA</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Who can contribute to SpeakALA?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Any current or former ALA student, faculty member, or community member can contribute words to our
                    dictionary. We welcome contributions from anyone familiar with ALA culture and vocabulary.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How are submissions reviewed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All submissions are reviewed by our student editorial team to ensure accuracy, appropriateness, and
                    relevance to ALA culture. We aim to review submissions within 48 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I suggest edits to existing words?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! If you notice an error or have additional information about a word, please contact us with your
                    suggestions. We're always looking to improve the accuracy of our dictionary.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Is SpeakALA available offline?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Currently, SpeakALA is a web-based dictionary. We're exploring options for offline access and mobile
                    apps based on community feedback and needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Support SpeakALA</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                SpeakALA is a student-driven initiative. Help us grow by contributing words, sharing with friends, or
                getting involved in the project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Contribute</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Add words and help build our dictionary</p>
                  <Button asChild className="w-full">
                    <a href="/contribute">Add a Word</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Tell your friends about SpeakALA</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Share Project
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Help us improve with your suggestions</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <a href="mailto:speakala@africanleadershipacademy.org">Send Feedback</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
