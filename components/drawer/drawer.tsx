import React from 'react'

import { Drawer as ChakraDrawer, DrawerProps as ChakraDrawerProps, UseDisclosureProps } from '@chakra-ui/react'
import {useDisclosureTracker} from "@/contexts/disclosure.tracker.context";

interface DrawerProps extends Omit<ChakraDrawerProps, 'isOpen' | 'onClose'> {
  disclosureId: string
  disclosureProps?: UseDisclosureProps
}

const Drawer: React.FC<DrawerProps> = props => {
  const { children, disclosureId, disclosureProps, ...drawerProps } = props
  const { isOpen, onClose: handleClose } = useDisclosureTracker(disclosureId, disclosureProps)

  return (
    <ChakraDrawer isOpen={isOpen} onClose={handleClose} {...drawerProps}>
      {children}
    </ChakraDrawer>
  )
}

export default Drawer
