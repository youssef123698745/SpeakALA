"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { WordCard } from "@/components/word-card"
import { searchWords, getAllWords, type DictionaryWord } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Users, Search, Plus, AlertTriangle, Settings, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<DictionaryWord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [featuredWords, setFeaturedWords] = useState<DictionaryWord[]>([])
  const [firebaseError, setFirebaseError] = useState<string | null>(null)
  const [currentSearchLanguage, setCurrentSearchLanguage] = useState<string | undefined>()

  // Load featured words on component mount
  useEffect(() => {
    const loadFeaturedWords = async () => {
      try {
        const words = await getAllWords()
        // Get first 6 words as featured
        setFeaturedWords(words.slice(0, 6))
        setFirebaseError(null)
      } catch (error) {
        console.error("Error loading featured words:", error)
        if (error instanceof Error && error.message.includes("permissions")) {
          setFirebaseError("Firebase security rules need to be configured. Please follow the setup instructions.")
        }
      }
    }

    loadFeaturedWords()
  }, [])

  const handleSearch = async (query: string, language?: string) => {
    setIsLoading(true)
    setHasSearched(true)
    setCurrentSearchLanguage(language)

    try {
      const results = await searchWords(query, language)
      setSearchResults(results)
      setFirebaseError(null)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
      if (error instanceof Error && error.message.includes("permissions")) {
        setFirebaseError("Firebase security rules need to be configured. Please follow the setup instructions.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {firebaseError && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3">
            <div className="container mx-auto">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{firebaseError}</span>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/setup">
                      <Settings className="h-4 w-4 mr-2" />
                      Setup Instructions
                    </Link>
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 px-4">
          <div className="container mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Welcome to <span className="text-primary">SpeakALA</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
                The multilingual dictionary for African Leadership Academy's unique vocabulary, created by students for
                our diverse community.
              </p>
            </div>

            {/* Search Section */}
            <div className="space-y-6">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>500+ Words</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Multiple Languages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Student Created</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Easy Search</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {hasSearched && (
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {isLoading ? "Searching..." : `Search Results (${searchResults.length})`}
                  {currentSearchLanguage && (
                    <span className="text-lg font-normal text-muted-foreground ml-2">in {currentSearchLanguage}</span>
                  )}
                </h2>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((word) => (
                    <WordCard key={word.id} word={word} selectedLanguage={currentSearchLanguage} />
                  ))}
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No words found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try searching with different keywords or browse our featured words below.
                    </p>
                    <Link href="/contribute">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add This Word
                      </Button>
                    </Link>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Featured Words Section */}
        {!hasSearched && featuredWords.length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured ALA Words</h2>
                <p className="text-muted-foreground text-lg">
                  Discover some of the unique vocabulary that makes our school special, available in multiple languages
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredWords.map((word) => (
                  <WordCard key={word.id} word={word} />
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link href="/browse">Browse All Words</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {!hasSearched && featuredWords.length === 0 && firebaseError && (
          <section className="py-12 px-4">
            <div className="container mx-auto text-center space-y-6">
              <div className="max-w-md mx-auto">
                <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Setup Required</h2>
                <p className="text-muted-foreground mb-6">
                  Firebase needs to be configured before you can use the dictionary features.
                </p>
                <Button asChild size="lg">
                  <Link href="/setup">
                    <Settings className="h-5 w-5 mr-2" />
                    Complete Setup
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Help Build Our Multilingual Dictionary</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Know a word that's not in our dictionary? Contribute in any language to our growing collection of ALA
              vocabulary and help preserve our unique school culture for our diverse community.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contribute">
                <Plus className="h-5 w-5 mr-2" />
                Add a Word or Translation
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
