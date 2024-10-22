import React from 'react'

import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { Link as ReactRouterLink } from 'react-router-dom'

import { CategorySuggetion, PhraseSuggestion, ProductSuggestion } from '../../search'
import styles from '../../search.styles'

type SearchResultsProps = {
  suggestions?: Array<CategorySuggetion | ProductSuggestion | PhraseSuggestion>
  onSearchSubmit: (event: React.FormEvent) => void
}

const SearchResults: React.FC<SearchResultsProps> = props => {
  const intl = useIntl()

  const { suggestions } = props
  if (!suggestions) {
    return null
  }

  return (
    <Stack alignItems="flex-start" data-testid="sf-suggestion" spacing={3}>
      {suggestions
        ? suggestions.map(suggestion => (
            <ChakraLink as={ReactRouterLink} key={suggestion.id} to={suggestion.link} {...styles.suggestion}>
              <Stack gap={0}>
                <Text dangerouslySetInnerHTML={{ __html: suggestion.name }} fontWeight="500" textOverflow="ellipsis" />

                {suggestion.type === 'product' ? (
                  <Text fontSize="sm" mt={1}>
                    {intl.formatNumber((suggestion as ProductSuggestion).price, {
                      currency: (suggestion as ProductSuggestion).currency,
                      style: 'currency'
                    })}
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
