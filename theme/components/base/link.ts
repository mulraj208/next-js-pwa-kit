import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

export default defineStyleConfig({
  baseStyle: defineStyle({
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    _hover: {
      textDecoration: 'underline'
    },
    _focusVisible: {
      boxShadow: 'outline'
    }
  }),
  variants: {
    noUnderline: defineStyle({
      _hover: {
        textDecoration: 'none'
      }
    })
  }
})
