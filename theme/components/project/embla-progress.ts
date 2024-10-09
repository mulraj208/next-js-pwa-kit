import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

const EmblaProgressAnatomy = anatomy('emblaProgress').parts('container', 'bar')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(EmblaProgressAnatomy.keys)

const colorSchemes = {
  default: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    bar: defineStyle({
      bg: 'red.300'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      overflow: 'hidden'
    }),
    bar: defineStyle({
      w: '100%'
    })
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        container: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'container')
        }),
        bar: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'bar')
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      container: defineStyle({
        // ...
      }),
      bar: defineStyle({
        h: '0.5rem'
      })
    })
  },
  defaultProps: {
    variant: 'default',
    size: 'default',
    colorScheme: 'default'
  }
})
