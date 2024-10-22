import React from 'react'

import { Button, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import { Link as ReactRouterLink } from 'react-router-dom'

import { RECENT_SEARCH_KEY } from '../../../../../constants'

import { clearSessionJSONItem } from '../../../../../utils'
import { searchUrlBuilder } from '../../../../../utils/urls'

type RecentSearchesProps = {
  recentSearches?: Array<string>
  onSearchClose: () => void
}

const RecentSearches: React.FC<RecentSearchesProps> = props => {
  const intl = useIntl()

  const { recentSearches, onSearchClose: handleSearchClose } = props
  const handleClearSearches = () => {
    clearSessionJSONItem(RECENT_SEARCH_KEY)
    handleSearchClose()
  }

  return (
    <>
      {recentSearches && recentSearches?.length > 0 ? (
        <>
          <Text color="gray.500" data-testid="sf-suggestion-recent" fontSize="md" fontWeight="700">
            {intl.formatMessage({
              id: 'recent_searches.heading.recent_searches'
            })}
          </Text>

          <Stack mt={6} spacing={6}>
            {recentSearches.map(recentSearch => (
              <ChakraLink
                as={ReactRouterLink}
                fontSize="md"
                key={recentSearch}
                to={searchUrlBuilder(recentSearch)}
                width="full"
                _hover={{
                  color: 'carminepink.800'
                }}
              >
                <Text fontWeight="400">{recentSearch}</Text>
              </ChakraLink>
            ))}
          </Stack>

          <Button
            colorScheme="clear"
            data-testid="clear-search"
            id="clear-search"
            justifyContent="left"
            pl={0}
            variant="link"
            onMouseDown={handleClearSearches}
            onTouchStart={handleClearSearches}
          >
            <Text color="blue.600" fontSize="md" fontWeight="400">
              {intl.formatMessage({
                id: 'recent_searches.action.clear_searches'
              })}
            </Text>
          </Button>
        </>
      ) : null}
    </>
  )
}

export default RecentSearches
