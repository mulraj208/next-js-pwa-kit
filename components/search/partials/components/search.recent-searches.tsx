import React from 'react'

import { Button, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link';

import {RECENT_SEARCH_KEY} from "@/constants";
import {clearSessionJSONItem} from "@/utils/utils";
import {searchUrlBuilder} from "@/utils/urls";

type RecentSearchesProps = {
  recentSearches?: Array<string>
  onSearchClose: () => void
}

const RecentSearches: React.FC<RecentSearchesProps> = props => {
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
            Recent Searches
          </Text>

          <Stack mt={6} gap={6}>
            {recentSearches.map(recentSearch => (
              <ChakraLink
                as={Link}
                fontSize="md"
                key={recentSearch}
                href={searchUrlBuilder(recentSearch)}
                width="full"
                _hover={{
                  color: 'red.800'
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
            onMouseDown={handleClearSearches}
            onTouchStart={handleClearSearches}
          >
            <Text color="blue.600" fontSize="md" fontWeight="400">
              Clear recent searches
            </Text>
          </Button>
        </>
      ) : null}
    </>
  )
}

export default RecentSearches
