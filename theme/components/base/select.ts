import { selectAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import inputTheme from './input'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    field: defineStyle({
      ...inputTheme.baseStyle?.field,
      lineHeight: 'normal'
    }),
    icon: defineStyle({
      insetEnd: '2',
      color: 'currentColor',
      _disabled: {}
    })
  }),
  sizes: inputTheme.sizes,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
})
