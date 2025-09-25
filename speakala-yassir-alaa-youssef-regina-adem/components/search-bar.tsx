"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAvailableLanguages } from "@/lib/dictionary"

interface SearchBarProps {
  onSearch: (query: string, language?: string) => void
  placeholder?: string
  isLoading?: boolean
}

export function SearchBar({ onSearch, placeholder = "Search for a word...", isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await getAvailableLanguages()
        setAvailableLanguages(languages)
      } catch (error) {
        console.error("Error loading languages:", error)
      }
    }
    loadLanguages()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), selectedLanguage === "all" ? undefined : selectedLanguage)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Trigger search on every keystroke for instant results
    if (value.trim()) {
      onSearch(value.trim(), selectedLanguage === "all" ? undefined : selectedLanguage)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    if (query.trim()) {
      onSearch(query.trim(), language === "all" ? undefined : language)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-4 py-3 text-lg bg-card border-2 border-border focus:border-primary transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full sm:w-[180px] py-3">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {availableLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="px-6 py-3 text-lg bg-primary hover:bg-primary/90 w-full sm:w-auto"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  )
}
