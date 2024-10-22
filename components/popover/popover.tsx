import React from 'react'

import { Popover as ChakraPopover, PopoverProps as ChakraPopoverProps, UseDisclosureProps } from '@chakra-ui/react'
import {useDisclosureTracker} from "@/contexts/disclosure.tracker.context";

interface PopoverProps extends Omit<ChakraPopoverProps, 'isOpen' | 'onClose' | 'onOpen'> {
  disclosureId: string
  disclosureProps?: UseDisclosureProps
}

const Popover: React.FC<PopoverProps> = props => {
  const { children, disclosureId, disclosureProps, ...rest } = props
  const { isOpen, onClose: handleClose, onOpen: handleOpen } = useDisclosureTracker(disclosureId, disclosureProps)
  return (
    <ChakraPopover isOpen={isOpen} onClose={handleClose} onOpen={handleOpen} {...rest}>
      {children}
    </ChakraPopover>
  )
}

export default Popover
