import React from 'react'

import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link';
import { CategorySuggestion, PhraseSuggestion, ProductSuggestion } from '../../search'
import styles from '../../search.styles'

type SearchResultsProps = {
  suggestions?: Array<CategorySuggestion | ProductSuggestion | PhraseSuggestion>
  onSearchSubmit: (event: React.FormEvent) => void
}

const SearchResults: React.FC<SearchResultsProps> = props => {
  const { suggestions } = props
  if (!suggestions) {
    return null
  }

  return (
    <Stack alignItems="flex-start" data-testid="sf-suggestion" gap={3}>
      {suggestions
        ? suggestions.map(suggestion => (
            <ChakraLink as={Link} key={suggestion.id} href={suggestion.link} {...styles.suggestion}>
              <Stack gap={0}>
                <Text dangerouslySetInnerHTML={{ __html: suggestion.name }} fontWeight="500" textOverflow="ellipsis" />

                {suggestion.type === 'product' ? (
                  <Text fontSize="sm" mt={1}>
                    ${(suggestion as ProductSuggestion).price}
                  </Text>
                ) : null}
              </Stack>
            </ChakraLink>
          ))
        : null}
    </Stack>
  )
}

export default SearchResults
