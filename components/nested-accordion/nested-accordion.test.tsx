import React from 'react'

import { categoryUrlBuilder } from '@salesforce/retail-react-app/app/utils/url'

import NestedAccordion, { AccordionItemType } from './nested-accordion'

import { testA11y } from '../../../test-utils'
import { mockCategories } from '../../../tests/mocks/mock-data'
import { renderWithTestProviders } from '../../../utils/test-utils'

const itemsKey = 'categories'

describe('Nested Accordion', () => {
  test('passes a11y test', async () => {
    await testA11y(
      <NestedAccordion
        allowMultiple
        item={mockCategories.root as unknown as AccordionItemType}
        itemsKey={itemsKey}
        urlBuilder={category => categoryUrlBuilder(category as CommerceSDK.Category)}
      />
    )
  })

  test('renders NestedAccordion', () => {
    renderWithTestProviders(
      <NestedAccordion
        allowMultiple
        item={mockCategories.root as unknown as AccordionItemType}
        itemsKey={itemsKey}
        urlBuilder={category => categoryUrlBuilder(category as CommerceSDK.Category)}
      />
    )

    const accordions = document.querySelectorAll('.sf-nested-accordion')

    expect(accordions).toHaveLength(3)
  })

  test('renders NestedAccordion with custom url builder', () => {
    const mockPath = '/mock-path'
    renderWithTestProviders(
      <NestedAccordion
        item={mockCategories.root as unknown as AccordionItemType}
        itemsKey={itemsKey}
        urlBuilder={() => mockPath}
      />
    )

    const firstLeafLink: HTMLAnchorElement = document.querySelector('.sf-nested-accordion a')!

    expect(firstLeafLink.href.endsWith(mockPath)).toBe(true)
  })
})
