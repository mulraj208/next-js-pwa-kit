import React from 'react'

import { screen, waitFor } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import CategoryMenu from './category-menu'

import { testA11y } from '../../../test-utils'
import { mockCategories } from '../../../tests/mocks/mock-data'
import { renderWithTestProviders } from '../../../utils/test-utils'

describe('Category menu', () => {
  test('passes a11y test', async () => {
    await testA11y(<CategoryMenu listVariant="vertical" maxColumns={4} root={mockCategories.root} />)
  })

  test('renders Category Menu', async () => {
    renderWithTestProviders(<CategoryMenu root={mockCategories.root} />)
    const user = userEvent.setup()
    const mainNavigation = screen.getByRole('navigation', { name: /main navigation/i })
    const mensMenuItem = screen.getByText(/mens/i)

    expect(mainNavigation).toBeInTheDocument()
    // Check if the category is rendered
    expect(mensMenuItem).toBeInTheDocument()

    await user.hover(mensMenuItem)

    await waitFor(() => {
      expect(screen.getByLabelText(/clothing/i)).toBeInTheDocument()
      expect(screen.getByText(/suits/i)).toBeInTheDocument()
      expect(screen.getByText(/pants/i)).toBeInTheDocument()
    })
  })
})
