"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { WordCard } from "@/components/word-card"
import { getAllWords, searchWords, type DictionaryWord } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { BookOpen, Filter, Grid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BrowsePage() {
  const [words, setWords] = useState<DictionaryWord[]>([])
  const [filteredWords, setFilteredWords] = useState<DictionaryWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("alphabetical")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const loadWords = async () => {
      try {
        const allWords = await getAllWords()
        setWords(allWords)
        setFilteredWords(allWords)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allWords.map((word) => word.category).filter(Boolean))) as string[]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error loading words:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWords()
  }, [])

  useEffect(() => {
    let filtered = [...words]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((word) => word.category === selectedCategory)
    }

    // Sort words
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.word.localeCompare(b.word)
        case "newest":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case "oldest":
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        default:
          return 0
      }
    })

    setFilteredWords(filtered)
  }, [words, selectedCategory, sortBy])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredWords(words)
      return
    }

    try {
      const results = await searchWords(query)
      setFilteredWords(results)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 text-primary mx-auto animate-pulse" />
            <p className="text-muted-foreground">Loading dictionary...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Browse Dictionary</h1>
              <p className="text-xl text-muted-foreground">
                Explore all {words.length} words in the SpeakALA dictionary
              </p>
            </div>

            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 px-4 border-b">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{filteredWords.length} words</span>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Words Display */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            {filteredWords.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredWords.map((word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    showFullDetails={viewMode === "list"}
                    className={viewMode === "list" ? "w-full" : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No words found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
