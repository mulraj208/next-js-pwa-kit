import React from 'react'

import { getSessionJSONItem, setSessionJSONItem } from '@salesforce/retail-react-app/app/utils/utils'
import { screen, waitFor, within } from '@testing-library/react'

import userEvent, { UserEvent } from '@testing-library/user-event'
import { rest } from 'msw'

import Search from './search'

import { RECENT_SEARCH_KEY, RECENT_SEARCH_LIMIT } from '../../../../core/constants'
import { testA11y } from '../../../test-utils'
import mockSearchResults from '../../../tests/mocks/searchResults'
import { renderWithTestProviders } from '../../../utils/test-utils'

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

describe('Search', () => {
  let user: UserEvent
  let searchInput: HTMLInputElement

  beforeEach(() => {
    jest.resetModules()

    global.server.use(
      rest.get('*/search-suggestions', (_req, res, ctx) => {
        return res(ctx.delay(0), ctx.status(200), ctx.json(mockSearchResults))
      })
    )

    user = userEvent.setup()
    renderWithTestProviders(<Search />)
    searchInput = screen.getByRole('searchbox')
  })

  test('passes a11y test', async () => {
    await testA11y(<Search />)
  })

  test('renders SearchInput', () => {
    expect(searchInput).toBeInTheDocument()
  })

  test('changes url when enter is pressed', async () => {
    await user.type(searchInput, 'Dresses')
    await user.type(searchInput, '{Enter}')
    expect(window.location.pathname).toBe('/us/en-US/search')
    expect(window.location.search).toBe('?q=Dresses')
  })

  test('saves recent searches on submit', async () => {
    setSessionJSONItem(RECENT_SEARCH_KEY, ['Dresses', 'Suits', 'Tops'])
    await user.type(searchInput, 'Gloves')
    await user.type(searchInput, '{Enter}')
    expect(getSessionJSONItem(RECENT_SEARCH_KEY)).toHaveLength(4)
  })

  test('limits number of saved recent searches', async () => {
    setSessionJSONItem(RECENT_SEARCH_KEY, ['Dresses', 'Suits', 'Tops', 'Gloves', 'Bracelets'])
    await user.type(searchInput, 'Ties')
    await user.type(searchInput, '{Enter}')
    expect(getSessionJSONItem(RECENT_SEARCH_KEY)).toHaveLength(RECENT_SEARCH_LIMIT)
  })

  test('suggestions render when there are some', async () => {
    await user.type(searchInput, 'Men')
    expect(searchInput?.value).toBe('Men')
    const suggestionPopoverEl = screen.getByTestId('sf-suggestion-popover')

    expect(suggestionPopoverEl?.querySelector('.chakra-link .chakra-text')?.textContent).toEqual(
      expect.stringContaining('Men')
    )
  })

  test('aria-live status should be 7 items are available', async () => {
    await user.type(searchInput, 'Men')
    const ariaLiveRegionStatus = screen.getByRole('status')
    expect(ariaLiveRegionStatus.textContent).toBe('7 items are available')
  })
})

describe('Search - Recent Searches Functionality', () => {
  test('shows previously searched items when focused', async () => {
    const user = userEvent.setup()

    setSessionJSONItem(RECENT_SEARCH_KEY, ['Dresses', 'Suits', 'Tops'])
    renderWithTestProviders(<Search />)
    const searchInput = screen.getByRole('searchbox')

    await user.clear(searchInput)
    searchInput.focus()

    const suggestionPopoverEl = screen.getByTestId('sf-suggestion-popover')
    const recentSearchesEl = within(suggestionPopoverEl).getByTestId('sf-suggestion-recent')

    expect(recentSearchesEl).toBeInTheDocument()
    expect(document.querySelectorAll('[data-testid=sf-suggestion-popover] .chakra-link')).toHaveLength(3)
  })

  test('clicking clear searches clears recent searches', async () => {
    const user = userEvent.setup()
    setSessionJSONItem(RECENT_SEARCH_KEY, ['Dresses', 'Suits', 'Tops'])
    renderWithTestProviders(<Search />)
    const searchInput = screen.getByRole('searchbox')

    await waitFor(async () => {
      searchInput.focus()
      const clearSearch = screen.getByTestId('clear-search')
      await user.click(clearSearch)
      expect(getSessionJSONItem(RECENT_SEARCH_KEY)).toBeUndefined()
    })
  })
})
