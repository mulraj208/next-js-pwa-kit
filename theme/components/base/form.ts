import { formAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  primary: definePartsStyle({
    helperText: defineStyle({
      color: 'gray.500'
    }),
    requiredIndicator: defineStyle({
      color: 'red.600'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      width: '100%',
      position: 'relative'
    }),
    helperText: defineStyle({
      textAlign: 'left'
    })
  }),
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
      requiredIndicator: defineStyle({ ml: 1 }),
      helperText: defineStyle({
        fontSize: 'sm',
        fontWeight: 400,
        lineHeight: 5,
        mt: 1
      })
    })
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
    colorScheme: 'primary'
  }
})
