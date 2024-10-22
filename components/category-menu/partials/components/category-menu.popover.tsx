'use client';

import React, { useEffect, useId, useRef } from 'react'

import { Box, useDisclosure } from '@chakra-ui/react'

import CategoryMenuContent from './category-menu.content'
import CategoryMenuTrigger from './category-menu.trigger'

// Delays the opening/closing of menu items (milliseconds)
import { HEADER_HOVER_DELAY } from '../../category-menu.styles'
import {usePathname} from "next/navigation";
import {DISCLOSURES_IDS} from "@/constants";
import {LinkListVariant} from "@/components/links-list";
import Popover from "@/components/popover";

type CategoryMenuPopoverProps = {
  listVariant?: LinkListVariant
  items: Array<CommerceSDK.Category> | undefined
  item: CommerceSDK.Category
  name?: string
  itemsKey: string
  maxColumns: number
}

const CategoryMenuPopover: React.FC<CategoryMenuPopoverProps> = props => {
  const { listVariant, items, item, name, itemsKey, maxColumns } = props
  const path = usePathname();

  // Setting up disclosure for individual menu itmes
  // giving them a unique id with a prefix
  const disclosureId = `${DISCLOSURES_IDS.DESKTOP_NAVIGATION} ${useId()}`
  // Here we set up disclosure props manually - so to speak -
  // instead of letting the Popover component do it,
  // because we need these handler functions to control the menu as a whole
  const { isOpen, onClose: handleClose, onOpen: handleOpen } = useDisclosure()

  const menuItemRef = useRef<HTMLDivElement>(null)
  const popoverBodyRef = useRef<HTMLDivElement>(null)

  const closingTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const openingTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  const keyMap = {
    Escape: { action: () => handleClose() },
    Space: { action: () => handleOpen() }
  }

  useEffect(() => {
    // Location has changed, close the menu
    handleClose()
  }, [path])

  const handleMouseEnter = () => {
    openingTimeout.current = setTimeout(() => {
      handleOpen()
    }, HEADER_HOVER_DELAY)

    clearTimeout(closingTimeout.current)
  }

  const handleDelayedClose = () => {
    closingTimeout.current = setTimeout(() => {
      handleClose()
    }, HEADER_HOVER_DELAY)
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout(openingTimeout.current)

    // Close the menu without delay if the cursor has left the menu area
    if (event.relatedTarget instanceof Node && !menuItemRef.current?.parentElement?.contains(event.relatedTarget)) {
      handleClose()
      return
    }

    handleDelayedClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keyDown = keyMap[e.code as keyof typeof keyMap]

    if (!keyDown) {
      return
    }

    e.preventDefault()
    keyDown.action()
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement | HTMLAnchorElement>) => {
    // Do not close if focus is within the popover body
    if (popoverBodyRef.current?.parentElement?.contains(event.relatedTarget as Node)) {
      return
    }

    handleDelayedClose()
  }

  const handleClick = () => {
    clearTimeout(openingTimeout.current)
  }

  return (
    <Box
      ref={menuItemRef}
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Popover
        isLazy
        returnFocusOnClose
        disclosureId={disclosureId}
        disclosureProps={{ onOpen: handleOpen, onClose: handleClose, isOpen }}
        gutter={0}
        placement="bottom"
        size="full"
        variant="category_menu"
      >
        <CategoryMenuTrigger hasItems={!!items} isOpen={isOpen} item={item} name={name} onBlur={handleBlur} />

        {items ? (
          <CategoryMenuContent
            items={items}
            itemsKey={itemsKey}
            listVariant={listVariant}
            maxColumns={maxColumns}
            popoverBodyRef={popoverBodyRef}
            onBlur={handleBlur}
            onClose={handleClose}
          />
        ) : null}
      </Popover>
    </Box>
  )
}

export default CategoryMenuPopover
