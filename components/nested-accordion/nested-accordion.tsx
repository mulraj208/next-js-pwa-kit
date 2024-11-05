import React from 'react'

import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import {
  Button,
  Heading,
  Text,
  AccordionRootProps
} from '@chakra-ui/react'
import Link from 'next/link';
import {AccordionItemContent, AccordionRoot} from "@/components/ui/accordion";

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
} & AccordionRootProps

const NestedAccordionMenu: React.FC<NestedAccordionMenuProps> = props => {
  const {
    item,
    itemsKey,
    initialDepth = 0,
    fontSizes,
    fontWeights,
    urlBuilder = (item: { id: string }) => `/${item.id}`,
    ...rest
  } = props
  const depth = initialDepth
  const items = item[itemsKey as string] as Array<AccordionItemType>

  return (
    <AccordionRoot className="sf-nested-accordion" {...rest}>
      {items
        ? items.map((item: AccordionItemType) => {
            const { id, name } = item
            const items = item[itemsKey as string]
            const hasVisibleChild = !!(items && Object.keys(items).length > 0)
            const isExpanded = false;

            return (
              <AccordionItemContent key={id}>
                  {/* Heading */}
                  <Heading as="h2">
                    {/* Show item as a leaf node if it has no visible child items. */}
                    {hasVisibleChild ? (
                        <Button
                            py={2}
                            _hover={{
                              color: 'red.600'
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
                        </Button>
                    ) : (
                        <Button
                            as={Link}
                            color="black"
                            pl={8}
                            py={2}
                            // @ts-expect-error - Fix this later
                            href={urlBuilder(item)}
                            _hover={{
                              color: 'red.500'
                            }}
                        >
                          <Text
                              fontSize={(fontSizes && fontSizes[depth]) || 'sm'}
                              fontWeight={(fontWeights && fontWeights[depth]) || 'regular'}
                          >
                            {name}
                          </Text>
                        </Button>
                    )}
                  </Heading>

                  {/* Child Items */}
                  {items ? (
                      <AccordionItemContent>
                        <NestedAccordionMenu pl={4} {...props} initialDepth={depth + 1} item={item} />
                      </AccordionItemContent>
                  ) : null}
              </AccordionItemContent>
            )
          })
        : null}
    </AccordionRoot>
  )
}

export default NestedAccordionMenu
