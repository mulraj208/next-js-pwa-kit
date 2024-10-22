/**
 * NOTE:
 * This component is due to be refactored
 * Form inputs will be added to the project in the future and might not follow the same structure
 */

import React from 'react'

import { Input, InputProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import styles from '../../search.styles'

type SearchInputProps = {
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchFocus: () => void
  onSearchBlur?: (event: React.FocusEvent) => void
  searchInputRef?: React.RefObject<HTMLInputElement>
} & InputProps

const SearchInput: React.FC<SearchInputProps> = props => {
  const {
    onSearchInputChange: handleSearchInputChange,
    onSearchFocus: handleSearchFocus,
    onSearchBlur: handleSearchBlur,
    searchInputRef,
    ...rest
  } = props
  const intl = useIntl()

  return (
    <Input
      aria-label={intl.formatMessage({ id: 'header.field.placeholder.search_for_products' })}
      autoComplete="off"
      id="search-input"
      ref={searchInputRef}
      type="search"
      onBlur={handleSearchBlur}
      onChange={handleSearchInputChange}
      onFocus={handleSearchFocus}
      {...rest}
      {...styles.input}
    />
  )
}

export default SearchInput
