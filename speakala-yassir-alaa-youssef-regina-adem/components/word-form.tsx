"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Save, Loader2, AlertCircle, Languages } from "lucide-react"
import { addWord, checkWordExists, type DictionaryWord } from "@/lib/dictionary"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WordFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const CATEGORIES = ["Slang", "Academic", "Dining", "Dormitory", "Sports", "Events", "Leadership", "Culture", "General"]

const LANGUAGES = [
  "English",
  "Swahili",
  "French",
  "Arabic",
  "Amharic",
  "Yoruba",
  "Zulu",
  "Afrikaans",
  "Hausa",
  "Igbo",
  "Portuguese",
  "Spanish",
  "Other",
]

export function WordForm({ onSuccess, onCancel }: WordFormProps) {
  const [formData, setFormData] = useState({
    word: "", // English word
    englishDefinition: "", // English definition
    englishPronunciation: "",
    category: "",
    contributor: "",
    englishExamples: [""], // English examples
    translations: [{ language: "", definition: "", pronunciation: "", examples: [""] }], // Additional translations
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingWord, setExistingWord] = useState<DictionaryWord | null>(null)
  const [showTranslationMode, setShowTranslationMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkExisting = async () => {
      if (formData.word.trim().length > 2) {
        try {
          const existing = await checkWordExists(formData.word)
          setExistingWord(existing)
        } catch (error) {
          console.error("Error checking word:", error)
        }
      } else {
        setExistingWord(null)
      }
    }

    const timeoutId = setTimeout(checkExisting, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.word])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTranslationChange = (index: number, field: string, value: string) => {
    const newTranslations = [...formData.translations]
    newTranslations[index] = { ...newTranslations[index], [field]: value }
    setFormData((prev) => ({ ...prev, translations: newTranslations }))
  }

  const handleTranslationExampleChange = (translationIndex: number, exampleIndex: number, value: string) => {
    const newTranslations = [...formData.translations]
    const newExamples = [...newTranslations[translationIndex].examples]
    newExamples[exampleIndex] = value
    newTranslations[translationIndex] = { ...newTranslations[translationIndex], examples: newExamples }
    setFormData((prev) => ({ ...prev, translations: newTranslations }))
  }

  const handleEnglishExampleChange = (index: number, value: string) => {
    const newExamples = [...formData.englishExamples]
    newExamples[index] = value
    setFormData((prev) => ({ ...prev, englishExamples: newExamples }))
  }

  const addTranslation = () => {
    setFormData((prev) => ({
      ...prev,
      translations: [...prev.translations, { language: "", definition: "", pronunciation: "", examples: [""] }],
    }))
  }

  const removeTranslation = (index: number) => {
    if (formData.translations.length > 1) {
      const newTranslations = formData.translations.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, translations: newTranslations }))
    }
  }

  const addTranslationExample = (translationIndex: number) => {
    const newTranslations = [...formData.translations]
    newTranslations[translationIndex].examples.push("")
    setFormData((prev) => ({ ...prev, translations: newTranslations }))
  }

  const removeTranslationExample = (translationIndex: number, exampleIndex: number) => {
    const newTranslations = [...formData.translations]
    if (newTranslations[translationIndex].examples.length > 1) {
      newTranslations[translationIndex].examples = newTranslations[translationIndex].examples.filter(
        (_, i) => i !== exampleIndex,
      )
      setFormData((prev) => ({ ...prev, translations: newTranslations }))
    }
  }

  const addEnglishExample = () => {
    setFormData((prev) => ({
      ...prev,
      englishExamples: [...prev.englishExamples, ""],
    }))
  }

  const removeEnglishExample = (index: number) => {
    if (formData.englishExamples.length > 1) {
      const newExamples = formData.englishExamples.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, englishExamples: newExamples }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.word.trim() || !formData.englishDefinition.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an English word and definition.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const validTranslations = formData.translations
        .filter((t) => t.language.trim() && t.definition.trim())
        .map((t) => ({
          language: t.language.trim(),
          definition: t.definition.trim(),
          pronunciation: t.pronunciation.trim() || undefined,
          examples: t.examples.filter((ex) => ex.trim()).length > 0 ? t.examples.filter((ex) => ex.trim()) : undefined,
        }))

      const validEnglishExamples = formData.englishExamples.filter((ex) => ex.trim())

      if (showTranslationMode && existingWord?.id) {
        // Adding translation to existing word
        if (validTranslations.length > 0) {
          await addTranslation(existingWord.id, {
            language: validTranslations[0].language,
            definition: validTranslations[0].definition,
            pronunciation: validTranslations[0].pronunciation,
            examples: validTranslations[0].examples,
            contributor: formData.contributor.trim() || undefined,
          })

          toast({
            title: "Translation Added Successfully!",
            description: `${validTranslations[0].language} translation for "${formData.word}" has been added.`,
          })
        }
      } else {
        // Adding new English word with optional translations
        await addWord({
          word: formData.word.trim(),
          englishDefinition: formData.englishDefinition.trim(),
          englishPronunciation: formData.englishPronunciation.trim() || undefined,
          category: formData.category || undefined,
          contributor: formData.contributor.trim() || undefined,
          initialTranslations: validTranslations.length > 0 ? validTranslations : undefined,
          englishExamples: validEnglishExamples.length > 0 ? validEnglishExamples : undefined,
        })

        toast({
          title: "Word Added Successfully!",
          description: `"${formData.word}" has been added to the SpeakALA dictionary${validTranslations.length > 0 ? ` with ${validTranslations.length} translation(s)` : ""}${validEnglishExamples.length > 0 ? ` and ${validEnglishExamples.length} example(s)` : ""}.`,
        })
      }

      // Reset form
      setFormData({
        word: "",
        englishDefinition: "",
        englishPronunciation: "",
        category: "",
        contributor: "",
        englishExamples: [""],
        translations: [{ language: "", definition: "", pronunciation: "", examples: [""] }],
      })
      setExistingWord(null)
      setShowTranslationMode(false)

      onSuccess?.()
    } catch (error) {
      console.error("Error adding word:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add word. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <Languages className="h-6 w-6" />
          {showTranslationMode ? "Add Translation" : "Add New English Word"}
        </CardTitle>
        <p className="text-muted-foreground">
          {showTranslationMode
            ? `Add a translation for "${existingWord?.word}"`
            : "Add an English word used at ALA with optional translations in other languages."}
        </p>
      </CardHeader>
      <CardContent>
        {existingWord && !showTranslationMode && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">This word already exists in the dictionary!</p>
                <p className="text-sm">
                  Available translations: English
                  {existingWord.translations.length > 0 &&
                    `, ${existingWord.translations.map((t) => t.language).join(", ")}`}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranslationMode(true)}
                  className="mt-2"
                >
                  Add Translation Instead
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English Word */}
          <div className="space-y-2">
            <Label htmlFor="word" className="text-base font-semibold">
              English Word or Phrase *
            </Label>
            <Input
              id="word"
              value={formData.word}
              onChange={(e) => handleInputChange("word", e.target.value)}
              placeholder="Enter the English word or phrase"
              className="text-lg"
              required
              disabled={showTranslationMode}
            />
            <p className="text-sm text-muted-foreground">The word as used in English at ALA</p>
          </div>

          {/* English Definition */}
          <div className="space-y-2">
            <Label htmlFor="englishDefinition" className="text-base font-semibold">
              English Definition *
            </Label>
            <Textarea
              id="englishDefinition"
              value={formData.englishDefinition}
              onChange={(e) => handleInputChange("englishDefinition", e.target.value)}
              placeholder="Provide a clear English definition"
              className="min-h-24 text-base"
              required
              disabled={showTranslationMode}
            />
          </div>

          {/* English Pronunciation */}
          <div className="space-y-2">
            <Label htmlFor="englishPronunciation" className="text-base font-semibold">
              English Pronunciation (Optional)
            </Label>
            <Input
              id="englishPronunciation"
              value={formData.englishPronunciation}
              onChange={(e) => handleInputChange("englishPronunciation", e.target.value)}
              placeholder="e.g., ah-lah or AY-lah"
              className="font-mono"
              disabled={showTranslationMode}
            />
          </div>

          {/* English Examples */}
          {!showTranslationMode && (
            <div className="space-y-2">
              <Label className="text-base font-semibold">English Examples (Optional)</Label>
              <div className="space-y-2">
                {formData.englishExamples.map((example, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={example}
                      onChange={(e) => handleEnglishExampleChange(index, e.target.value)}
                      placeholder={`Example sentence using this word`}
                      className="flex-1"
                    />
                    {formData.englishExamples.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeEnglishExample(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEnglishExample}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another Example
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Show how this word is used in context at ALA</p>
            </div>
          )}

          {/* Category */}
          {!showTranslationMode && (
            <div className="space-y-2">
              <Label className="text-base font-semibold">Category (Optional)</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Translations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                {showTranslationMode ? "Translation" : "Additional Translations (Optional)"}
              </Label>
              {!showTranslationMode && (
                <Button type="button" variant="outline" size="sm" onClick={addTranslation}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Translation
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {showTranslationMode
                ? "Add a translation in another language"
                : "Help make this word accessible to non-English speakers by adding translations"}
            </p>

            {formData.translations.map((translation, index) => (
              <Card key={index} className="p-4 bg-muted/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Translation {index + 1}</h4>
                    {!showTranslationMode && formData.translations.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeTranslation(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={translation.language}
                        onValueChange={(value) => handleTranslationChange(index, "language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.filter((lang) => lang !== "English").map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Pronunciation (Optional)</Label>
                      <Input
                        value={translation.pronunciation}
                        onChange={(e) => handleTranslationChange(index, "pronunciation", e.target.value)}
                        placeholder="Phonetic pronunciation"
                        className="font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Definition</Label>
                    <Textarea
                      value={translation.definition}
                      onChange={(e) => handleTranslationChange(index, "definition", e.target.value)}
                      placeholder="Definition in this language"
                      className="min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Examples (Optional)</Label>
                    {translation.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex gap-2">
                        <Input
                          value={example}
                          onChange={(e) => handleTranslationExampleChange(index, exampleIndex, e.target.value)}
                          placeholder={`Example ${exampleIndex + 1}`}
                          className="flex-1"
                        />
                        {translation.examples.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTranslationExample(index, exampleIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTranslationExample(index)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Example
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Contributor */}
          <div className="space-y-2">
            <Label htmlFor="contributor" className="text-base font-semibold">
              Your Name (Optional)
            </Label>
            <Input
              id="contributor"
              value={formData.contributor}
              onChange={(e) => handleInputChange("contributor", e.target.value)}
              placeholder="Enter your name to get credit"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.word.trim() ||
                !formData.englishDefinition.trim() ||
                (existingWord && !showTranslationMode)
              }
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {showTranslationMode ? "Adding Translation..." : "Adding Word..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {showTranslationMode ? "Add Translation" : "Add Word"}
                </>
              )}
            </Button>
            {showTranslationMode && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowTranslationMode(false)
                  setFormData((prev) => ({ ...prev, word: "" }))
                }}
              >
                Cancel Translation
              </Button>
            )}
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
