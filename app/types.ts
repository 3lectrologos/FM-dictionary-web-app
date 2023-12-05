export type Word = {
  word: string
  phonetics: Phonetics[]
  meanings: Meaning[]
  sourceUrls: string[]
}

export type Phonetics = {
  text?: string
  audio?: string
}

export type Meaning = {
  partOfSpeech: string
  definitions: Definition[]
  synonyms?: string[]
  antonyms?: string[]
}

export type Definition = {
  definition: string
  example?: string
  synonyms?: string[]
  antonyms?: string[]
}

export type ErrorResult = {
  title: string
  message: string
  resolution?: string
}