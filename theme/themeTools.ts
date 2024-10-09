import { ThemeObject } from './theme.interfaces'

export const getColorScheme = (scheme?: string, colorScheme?: ThemeObject): ThemeObject | Record<string, unknown> => {
  if (!scheme || !colorScheme) return {}

  const selectedColorScheme = colorScheme[scheme] as Record<string, unknown>

  return selectedColorScheme || {}
}

export const getColorSchemeParts = (scheme?: string, colorScheme?: Record<string, Record<string, unknown>>) => {
  if (!scheme || !colorScheme) return {}

  const selectedColorScheme = colorScheme[scheme] as Record<string, Record<string, unknown>>

  return selectedColorScheme || {}
}

export const getColorSchemePart = (scheme: Record<string, Record<string, unknown>>, part: string) => {
  const result = part in scheme ? scheme[part] : ({} as unknown as Record<string, unknown>)
  return result
}
