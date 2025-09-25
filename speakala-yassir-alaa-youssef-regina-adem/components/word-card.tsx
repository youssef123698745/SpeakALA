"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Volume2, Calendar, User, Plus } from "lucide-react"
import type { DictionaryWord } from "@/lib/dictionary"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WordCardProps {
  word: DictionaryWord
  showFullDetails?: boolean
  className?: string
  selectedLanguage?: string
  onAddTranslation?: (wordId: string) => void
}

export function WordCard({
  word,
  showFullDetails = false,
  className = "",
  selectedLanguage,
  onAddTranslation,
}: WordCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const [isExpanded, setIsExpanded] = useState(showFullDetails)

  const currentTranslation =
    currentLanguage === "English" ? null : word.translations.find((t) => t.language === currentLanguage)

  const availableLanguages = ["English", ...word.translations.map((t) => t.language)]

  const handlePronunciation = () => {
    const pronunciation = currentLanguage === "English" ? word.englishPronunciation : currentTranslation?.pronunciation

    if (pronunciation && "speechSynthesis" in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(word.word)
      utterance.rate = 0.8
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl text-primary font-bold">{word.word}</CardTitle>
            {word.category && (
              <Badge variant="secondary" className="text-xs">
                {word.category}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
              <SelectTrigger className="w-[100px] h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {onAddTranslation && (
              <Button variant="ghost" size="sm" onClick={() => onAddTranslation(word.id!)} className="h-7 px-2 text-xs">
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {((currentLanguage === "English" && word.englishPronunciation) || currentTranslation?.pronunciation) && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">
              /{currentLanguage === "English" ? word.englishPronunciation : currentTranslation?.pronunciation}/
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePronunciation}
              disabled={isPlaying}
              className="h-6 w-6 p-0"
            >
              <Volume2 className={`h-3 w-3 ${isPlaying ? "animate-pulse" : ""}`} />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            {currentLanguage === "English" ? word.englishDefinition : currentTranslation?.definition}
          </p>

          {!isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Show more details
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-3">
            {/* Examples */}
            {((currentLanguage === "English" && word.englishExamples) || currentTranslation?.examples) && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Examples</h4>
                <div className="space-y-1">
                  {(currentLanguage === "English" ? word.englishExamples : currentTranslation?.examples)?.map(
                    (example, index) => (
                      <div key={index} className="bg-muted/30 p-2 rounded text-xs">
                        <p className="text-muted-foreground italic">"{example}"</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Available languages */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Available Languages</h4>
              <div className="flex flex-wrap gap-1">
                {availableLanguages.map((language) => (
                  <Badge
                    key={language}
                    variant={language === currentLanguage ? "default" : "outline"}
                    className="text-xs cursor-pointer"
                    onClick={() => setCurrentLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(word.dateAdded)}</span>
              </div>
              {word.contributor && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{word.contributor}</span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Show less
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
