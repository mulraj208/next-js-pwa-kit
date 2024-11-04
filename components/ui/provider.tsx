"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import customSystem from '@/theme/index'

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={customSystem}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}
