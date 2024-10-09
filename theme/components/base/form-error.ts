import { formErrorAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  primary: definePartsStyle({
    text: defineStyle({
      color: 'red.600'
    }),
    icon: defineStyle({
      color: 'red.600'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: {},
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      text: defineStyle({
        mt: '1',
        fontSize: 'sm'
      }),
      icon: defineStyle({
        marginEnd: '0.5em'
      })
    })
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
    colorScheme: 'primary'
  }
})
