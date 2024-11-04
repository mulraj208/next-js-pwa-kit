import React from 'react'

import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Heading,
  Text
} from '@chakra-ui/react'
import Link from 'next/link';

export type AccordionItemType = {
  id?: string
  name?: string
} & { [key: string]: string | AccordionItemType | Array<AccordionItemType> }

type NestedAccordionMenuProps = {
  item: AccordionItemType
  itemsKey?: string
  initialDepth?: number
  fontSizes?: Array<string>
  fontWeights?: Array<string>
  urlBuilder: (item: AccordionItemType) => string
} & AccordionProps

const NestedAccordionMenu: React.FC<NestedAccordionMenuProps> = props => {
  const {
    item,
    itemsKey,
    initialDepth = 0,
    fontSizes,
    fontWeights,
    urlBuilder = item => `/${item.id as string}`,
    ...rest
  } = props
  const depth = initialDepth
  const items = item[itemsKey as string] as Array<AccordionItemType>

  return (
    <Accordion className="sf-nested-accordion" {...rest}>
      {items
        ? items.map((item: AccordionItemType) => {
            const { id, name } = item
            const items = item[itemsKey as string]
            const hasVisibleChild = !!(items && Object.keys(items).length > 0)

            return (
              <AccordionItem border="none" key={id}>
                {({ isExpanded }) => (
                  <>
                    {/* Heading */}
                    <Heading as="h2">
                      {/* Show item as a leaf node if it has no visible child items. */}
                      {hasVisibleChild ? (
                        <AccordionButton
                          py={2}
                          _hover={{
                            color: 'carminepink.900'
                          }}
                        >
                          {/* Replace default expanded/collapsed icons. */}
                          {isExpanded ? (
                            <ChevronDownIcon color="gray" height="auto" width={6} />
                          ) : (
                            <ChevronRightIcon color="gray" height="auto" width={6} />
                          )}

                          <Text
                            fontSize={(fontSizes && fontSizes[depth]) || 'sm'}
                            fontWeight={(fontWeights && fontWeights[depth]) || 'regular'}
                          >
                            {name}
                          </Text>
                        </AccordionButton>
                      ) : (
                        <AccordionButton
                          as={Link}
                          color="black"
                          pl={8}
                          py={2}
                          href={urlBuilder(item)}
                          _hover={{
                            color: 'carminepink.500'
                          }}
                        >
                          <Text
                            fontSize={(fontSizes && fontSizes[depth]) || 'sm'}
                            fontWeight={(fontWeights && fontWeights[depth]) || 'regular'}
                          >
                            {name}
                          </Text>
                        </AccordionButton>
                      )}
                    </Heading>

                    {/* Child Items */}
                    {items ? (
                      <AccordionPanel>
                        <NestedAccordionMenu pl={4} {...props} initialDepth={depth + 1} item={item} />
                      </AccordionPanel>
                    ) : null}
                  </>
                )}
              </AccordionItem>
            )
          })
        : null}
    </Accordion>
  )
}

export default NestedAccordionMenu
