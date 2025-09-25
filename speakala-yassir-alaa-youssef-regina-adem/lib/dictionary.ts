import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "./firebase"

export interface Translation {
  language: string
  definition: string
  pronunciation?: string
  examples?: string[]
  contributor?: string
  dateAdded: Date
}

export interface DictionaryWord {
  id?: string
  word: string // Always in English
  englishDefinition: string // Primary English definition
  englishPronunciation?: string
  englishExamples?: string[]
  translations: Translation[] // Additional language translations
  category?: string
  contributor?: string // Original contributor
  dateAdded: Date
  lastUpdated: Date
}

// Check if a word already exists (always check English word)
export async function checkWordExists(word: string): Promise<DictionaryWord | null> {
  try {
    const wordsRef = collection(db, "dictionary")
    const q = query(wordsRef, where("word", "==", word.toLowerCase().trim()))

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
      } as DictionaryWord
    }

    return null
  } catch (error) {
    console.error("Error checking word existence:", error)
    throw error
  }
}

export async function addWord(wordData: {
  word: string // English word
  englishDefinition: string // English definition
  englishPronunciation?: string
  englishExamples?: string[]
  category?: string
  contributor?: string
  initialTranslations?: {
    language: string
    definition: string
    pronunciation?: string
    examples?: string[]
  }[]
}) {
  try {
    // Check if word already exists
    const existingWord = await checkWordExists(wordData.word)

    if (existingWord) {
      throw new Error(
        `The word "${wordData.word}" already exists in the dictionary. You can add a translation instead.`,
      )
    }

    // Create initial translations array
    const translations: Translation[] = []

    if (wordData.initialTranslations) {
      for (const trans of wordData.initialTranslations) {
        const translation: Translation = {
          language: trans.language,
          definition: trans.definition,
          pronunciation: trans.pronunciation || undefined,
          examples: trans.examples?.filter((ex) => ex.trim()) || undefined,
          contributor: wordData.contributor || undefined,
          dateAdded: new Date(),
        }

        const cleanedTranslation = Object.fromEntries(
          Object.entries(translation).filter(([_, value]) => value !== undefined && value !== null),
        )
        translations.push(cleanedTranslation as Translation)
      }
    }

    const wordDoc = {
      word: wordData.word.toLowerCase().trim(),
      englishDefinition: wordData.englishDefinition,
      englishPronunciation: wordData.englishPronunciation || undefined,
      englishExamples: wordData.englishExamples?.filter((ex) => ex.trim()) || undefined,
      translations,
      category: wordData.category || undefined,
      contributor: wordData.contributor || undefined,
      dateAdded: new Date(),
      lastUpdated: new Date(),
    }

    // Remove undefined values to prevent Firebase errors
    const cleanedWordDoc = Object.fromEntries(
      Object.entries(wordDoc).filter(([_, value]) => value !== undefined && value !== null),
    )

    const docRef = await addDoc(collection(db, "dictionary"), cleanedWordDoc)

    console.log("[v0] Word added successfully with ID:", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error adding word:", error)
    throw error
  }
}

// Add translation to existing word
export async function addTranslation(
  wordId: string,
  translationData: {
    language: string
    definition: string
    pronunciation?: string
    examples?: string[]
    contributor?: string
  },
) {
  try {
    const translation: Translation = {
      language: translationData.language,
      definition: translationData.definition,
      pronunciation: translationData.pronunciation || undefined,
      examples: translationData.examples?.filter((ex) => ex.trim()) || undefined,
      contributor: translationData.contributor || undefined,
      dateAdded: new Date(),
    }

    const cleanedTranslation = Object.fromEntries(
      Object.entries(translation).filter(([_, value]) => value !== undefined && value !== null),
    )

    const wordRef = doc(db, "dictionary", wordId)
    await updateDoc(wordRef, {
      translations: arrayUnion(cleanedTranslation),
      lastUpdated: new Date(),
    })

    console.log("[v0] Translation added successfully")
    return wordId
  } catch (error) {
    console.error("Error adding translation:", error)
    throw error
  }
}

export async function searchWords(searchTerm: string, language?: string): Promise<DictionaryWord[]> {
  try {
    const wordsRef = collection(db, "dictionary")
    const q = query(
      wordsRef,
      where("word", ">=", searchTerm.toLowerCase()),
      where("word", "<=", searchTerm.toLowerCase() + "\uf8ff"),
      orderBy("word"),
    )

    const querySnapshot = await getDocs(q)
    const words: DictionaryWord[] = []

    querySnapshot.forEach((doc) => {
      const wordData = {
        id: doc.id,
        ...doc.data(),
      } as DictionaryWord

      // If language filter is specified and not "all", check if translation exists
      if (language && language !== "all" && language !== "English") {
        const hasLanguage = wordData.translations.some((t) => t.language === language)
        if (hasLanguage) {
          words.push(wordData)
        }
      } else {
        words.push(wordData)
      }
    })

    return words
  } catch (error) {
    console.error("Error searching words:", error)
    throw error
  }
}

export async function getAllWords(language?: string): Promise<DictionaryWord[]> {
  try {
    console.log("[v0] Fetching all words from Firebase...")
    const wordsRef = collection(db, "dictionary")
    const q = query(wordsRef, orderBy("word"))

    const querySnapshot = await getDocs(q)
    const words: DictionaryWord[] = []

    querySnapshot.forEach((doc) => {
      const wordData = {
        id: doc.id,
        ...doc.data(),
      } as DictionaryWord

      // If language filter is specified and not "all", check if translation exists
      if (language && language !== "all" && language !== "English") {
        const hasLanguage = wordData.translations.some((t) => t.language === language)
        if (hasLanguage) {
          words.push(wordData)
        }
      } else {
        words.push(wordData)
      }
    })

    console.log("[v0] Successfully fetched", words.length, "words")
    return words
  } catch (error) {
    console.error("Error getting words:", error)
    throw error
  }
}

export async function getAvailableLanguages(): Promise<string[]> {
  try {
    const words = await getAllWords()
    const languages = new Set<string>(["English"]) // Always include English

    words.forEach((word) => {
      word.translations.forEach((translation) => {
        languages.add(translation.language)
      })
    })

    return Array.from(languages).sort()
  } catch (error) {
    console.error("Error getting languages:", error)
    return ["English"]
  }
}
