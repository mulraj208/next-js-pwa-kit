'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import { SearchIcon } from 'lucide-react'
import {
  Center,
  Flex,
  HStack,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  VisuallyHidden,
  useBreakpointValue, Box
} from '@chakra-ui/react'
import { useSearchSuggestions } from '@salesforce/commerce-sdk-react'
import debounce from 'lodash/debounce'

import SearchInput from './partials/components/search.input'
import SearchSuggestions from './partials/components/search.suggestions'
import styles from './search.styles'

import {RECENT_SEARCH_KEY, RECENT_SEARCH_LIMIT, RECENT_SEARCH_MIN_LENGTH} from "@/constants";
import {boldString, capitalize, getSessionJSONItem, setSessionJSONItem} from "@/utils/utils";
import {HideOnDesktop, HideOnMobile} from "@/components/responsive";
import {categoryUrlBuilder, productUrlBuilder, searchUrlBuilder} from "@/utils/urls";
import {usePathname, useRouter} from "next/navigation";
import {PopoverRoot} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";

type Suggestion = {
  id: string
  type: string
  name: string
  link: string
}

export type ProductSuggestion = {
  currency: string
  price: number
  productId: string
} & Suggestion

export type CategorySuggestion = Suggestion
export type PhraseSuggestion = Suggestion

export type SearchSuggestion = {
  categorySuggestions?: Array<CategorySuggestion>
  productSuggestions?: Array<ProductSuggestion>
  phraseSuggestions?: Array<PhraseSuggestion>
}

const formatSuggestions = (searchSuggestions?: CommerceSDK.SuggestionResult, input?: string): SearchSuggestion => {
  return {
    categorySuggestions: searchSuggestions?.categorySuggestions?.categories?.map(suggestion => {
      return {
        type: 'category',
        id: suggestion.id,
        link: categoryUrlBuilder({ id: suggestion.id }),
        name: boldString(suggestion.name, capitalize(input as string))
      }
    }),
    productSuggestions: searchSuggestions?.productSuggestions?.products?.map(product => {
      return {
        id: product.productId,
        type: 'product',
        currency: product.currency,
        price: product.price,
        productId: product.productId,
        name: boldString(product.productName, capitalize(input as string)),
        link: productUrlBuilder(product)
      }
    }),
    phraseSuggestions: searchSuggestions?.categorySuggestions?.suggestedPhrases?.map(phrase => {
      return {
        id: phrase.phrase,
        type: 'phrase',
        name: boldString(phrase.phrase, capitalize(input as string)),
        link: searchUrlBuilder(phrase.phrase)
      }
    })
  }
}

const Search: React.FC = () => {
  const path = usePathname();
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const router = useRouter();
  const searchSuggestion = useSearchSuggestions(
    {
      parameters: {
        q: searchQuery
      }
    },
    {
      enabled: searchQuery?.length >= RECENT_SEARCH_MIN_LENGTH
    }
  )
  const searchInputRef = useRef<HTMLInputElement>(null)
  const recentSearches = (getSessionJSONItem(RECENT_SEARCH_KEY) || []) as Array<string>
  const searchSuggestions = useMemo(() => formatSuggestions(searchSuggestion.data, searchQuery), [searchQuery, searchSuggestion.data])
  const hasSearchSuggestions = !!(
    searchSuggestions &&
    (searchSuggestions?.categorySuggestions?.length ||
      searchSuggestions?.phraseSuggestions?.length ||
      searchSuggestions?.productSuggestions?.length)
  )
  const searchSuggestionsLength =
    (searchSuggestions?.categorySuggestions?.length || 0) + (searchSuggestions?.productSuggestions?.length || 0)

  const clearInput = () => {
    setSearchInputValue('')
    setIsOpen(false)
    setIsSearchFocused(false)
  }

  const handleOpenPopover = useCallback((forceOpen?: boolean) => {
    // As per design we only want to show the popover if the input is focused, and we have recent searches saved,
    // or we have search suggestions available and have inputted some text
    // (empty text in this scenario should show recent searches)
    if (isSearchFocused || forceOpen) {
      if (hasSearchSuggestions || searchQuery.length > 0) {
        // Open for search suggestions
        setIsOpen(true)
      } else if (recentSearches && recentSearches?.length > 0) {
        // Open for recent suggestions
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [hasSearchSuggestions, isSearchFocused, recentSearches, searchQuery.length])

  const handleSearchClose = useCallback(() => {
    clearInput()
    setIsOpen(false)
    setSearchQuery('')
  }, [])

  // Check if popover should open if we have suggestions
  useEffect(() => {
    handleOpenPopover()
  }, [handleOpenPopover, searchQuery, searchSuggestion.data])

  // Check if location has changed -- (e.g.: suggested link clicked)
  useEffect(() => {
    handleSearchClose()
  }, [handleSearchClose, path])

  const saveRecentSearch = (searchText: string) => {
    // Get recent searches or an empty array if undefined.
    let searches = (getSessionJSONItem(RECENT_SEARCH_KEY) || []) as Array<string>

    // Check if term is already in the saved searches
    searches = searches.filter(savedSearchTerm => {
      return searchText.toLowerCase() !== savedSearchTerm.toLowerCase()
    })

    // Create a new array consisting of the search text and up to 4 other resent searches.
    // Assuming the order is newest to oldest.
    searches = [searchText, ...searches].slice(0, RECENT_SEARCH_LIMIT)

    // Replace the save resent search with the updated value.
    setSessionJSONItem(RECENT_SEARCH_KEY, searches)
  }

  const debouncedSearch = debounce(input => {
    if (debouncedSearch && debouncedSearch.cancel) {
      debouncedSearch?.cancel()
    }

    setSearchQuery(input)
  }, 300)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setSearchInputValue(input)
    if (input.trim().length >= RECENT_SEARCH_MIN_LENGTH) {
      debouncedSearch(input)
    } else {
      setSearchQuery('')
    }
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // User has submitted the search text they have entered
    const searchText = searchQuery.trim()

    // Avoid empty string searches
    if (searchText.length < 1) {
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.value = ''
      }
      return
    }

    saveRecentSearch(searchText)
    router.push(searchUrlBuilder(searchText))

    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.blur()
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e)
    handleOpenPopover()
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    handleOpenPopover(true)
  }

  const isElementInPopoverContent = (event: React.FocusEvent) => {
    if (popoverContentRef.current) {
      return popoverContentRef.current.contains(event.relatedTarget)
    }
    return false
  }

  const handleSearchBlur = (event: React.FocusEvent) => {
    // Closes the search results and unfocused the search field
    // if the user is on desktop and the search result is not focused
    if (isDesktop && !isElementInPopoverContent(event)) {
      setIsSearchFocused(false)
      setIsOpen(false)
    }
  }

  const handlePopoverContentBlur = (event: React.FocusEvent) => {
    if (!isElementInPopoverContent(event)) {
      handleSearchClose()
    }
  }

  return (
    <>
      <VisuallyHidden>
        <Text aria-atomic="true" aria-live="polite" role="status">
          {searchSuggestion.isLoading && searchQuery.length > 0
            ? 'Loading Suggestions'
            : `${searchSuggestionsLength} items are available`}
        </Text>
      </VisuallyHidden>

      <PopoverRoot open={isOpen}>
        <PopoverTrigger>
          <form noValidate onSubmit={event => handleSearchSubmit(event)}>
            <HStack>
              <Flex pos="relative">
                <Box pos="absolute" top={0} left={0} h="full" mr="2rem" pointerEvents="none" w="2rem">
                  <SearchIcon color="red.600" />
                </Box>

                <SearchInput
                  autoComplete="off"
                  id="search-input"
                  searchInputRef={searchInputRef}
                  type="search"
                  value={searchInputValue}
                  onSearchBlur={handleSearchBlur}
                  onSearchFocus={handleSearchFocus}
                  onSearchInputChange={handleSearchInputChange}
                />
              </Flex>

              <HideOnDesktop>
                <Button
                  colorScheme="clear"
                  display={isOpen ? 'block' : 'none'}
                  maxHeight={10}
                  size="md"
                  onMouseDown={handleSearchClose}
                  onTouchStart={handleSearchClose}
                >
                  Cancel
                </Button>
              </HideOnDesktop>
            </HStack>
          </form>
        </PopoverTrigger>

        {/* Search results on DESKTOP */}
        <HideOnMobile>
          <PopoverContent
            {...styles.searchResultsDesktop}
            data-testid="sf-suggestion-popover"
            ref={popoverContentRef}
            onBlur={handlePopoverContentBlur}
          >
            {searchSuggestion.isLoading && searchQuery.length > 0 ? (
              <Center px={40} py={3}>
                <Spinner {...styles.spinner} />
              </Center>
            ) : (
              <SearchSuggestions
                recentSearches={recentSearches}
                searchSuggestions={searchSuggestions}
                onSearchClose={handleSearchClose}
                onSearchSubmit={handleSearchSubmit}
              />
            )}
          </PopoverContent>
        </HideOnMobile>
      </PopoverRoot>

      {/* Search results on MOBILE */}
      <HideOnDesktop>
        <Flex {...styles.searchResultsMobile} display={isOpen ? 'block' : 'none'}>
          {searchSuggestion.isLoading && searchQuery.length > 0 ? (
            <Center>
              <Spinner {...styles.spinner} />
            </Center>
          ) : (
            <SearchSuggestions
              recentSearches={recentSearches}
              searchSuggestions={searchSuggestions}
              onSearchClose={handleSearchClose}
              onSearchSubmit={handleSearchSubmit}
            />
          )}
        </Flex>
      </HideOnDesktop>
    </>
  )
}

export default Search
