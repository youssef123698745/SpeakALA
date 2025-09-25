"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WordCard } from "@/components/word-card"
import type { DictionaryWord } from "@/lib/dictionary"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

export default function WordDetailPage() {
  const params = useParams()
  const [word, setWord] = useState<DictionaryWord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWord = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid word ID")
        setIsLoading(false)
        return
      }

      try {
        const wordDoc = await getDoc(doc(db, "dictionary", params.id))

        if (wordDoc.exists()) {
          setWord({
            id: wordDoc.id,
            ...wordDoc.data(),
          } as DictionaryWord)
        } else {
          setError("Word not found")
        }
      } catch (error) {
        console.error("Error loading word:", error)
        setError("Failed to load word")
      } finally {
        setIsLoading(false)
      }
    }

    loadWord()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 text-primary mx-auto animate-pulse" />
            <p className="text-muted-foreground">Loading word...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !word) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">Word Not Found</h2>
            <p className="text-muted-foreground">{error || "The word you're looking for doesn't exist."}</p>
            <Button asChild>
              <Link href="/browse">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dictionary
              </Link>
            </Button>
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
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Navigation */}
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/browse">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dictionary
                </Link>
              </Button>
            </div>

            {/* Word Details */}
            <WordCard word={word} showFullDetails={true} />

            {/* Additional Actions */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/browse">Browse More Words</Link>
              </Button>
              <Button asChild>
                <Link href="/contribute">Suggest an Edit</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
