import React from 'react'

import { Box, Grid, Stack, Text } from '@chakra-ui/react'

import RecentSearches from './search.recent-searches'
import SearchResults from './serach.results'

import { SearchSuggestion } from '../../search'

type SearchSuggestionsProps = {
  recentSearches?: Array<string>
  searchSuggestions?: SearchSuggestion
  onSearchClose: () => void
  onSearchSubmit: (event: React.FormEvent) => void
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = props => {
  const {
    recentSearches,
    searchSuggestions,
    onSearchClose: handleSearchClose,
    onSearchSubmit: handleSearchSubmit
  } = props
  {
    /* Add or remove conditions based on what we want to show in the search results */
  }
  const hasSuggestions = !!(
    searchSuggestions?.categorySuggestions?.length || searchSuggestions?.productSuggestions?.length
  )

  const gridConfig = {
    // If the search suggestion don't include category suggestions we don't want to display the 2nd column
    // Single column for mobile view
    templateColumns: { base: 'auto', lg: `20rem ${searchSuggestions?.categorySuggestions?.length ? '20rem' : 'auto'}` }
  }

  return (
    <Box p={6}>
      {hasSuggestions ? (
        <Grid alignItems="flex-start" gap={6} {...gridConfig}>
          <Stack gap={4}>
            <Text color="gray.700" fontSize="sm" fontWeight="600">
              Products
            </Text>

            <SearchResults suggestions={searchSuggestions.productSuggestions} onSearchSubmit={handleSearchSubmit} />
          </Stack>

          {searchSuggestions.categorySuggestions ? (
            <Stack gap={4}>
              <Text color="gray.700" fontSize="sm" fontWeight="600">
                Categories
              </Text>

              <SearchResults suggestions={searchSuggestions.categorySuggestions} onSearchSubmit={handleSearchSubmit} />
            </Stack>
          ) : null}
        </Grid>
      ) : (
        <RecentSearches recentSearches={recentSearches} onSearchClose={handleSearchClose} />
      )}
    </Box>
  )
}

export default SearchSuggestions
