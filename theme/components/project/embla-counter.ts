import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

const EmblaCounterAnatomy = anatomy('emblaCounter').parts('container', 'coutner', 'divider', 'total')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(EmblaCounterAnatomy.keys)

const colorSchemes = {
  default: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    counter: defineStyle({
      // ...
    }),
    divider: defineStyle({
      // ...
    }),
    total: defineStyle({
      // ...
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    counter: defineStyle({
      // ...
    }),
    divider: defineStyle({
      // ...
    }),
    total: defineStyle({
      // ...
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
        counter: defineStyle({
          display: 'flex',
          ...getColorSchemePart(colorScheme, 'counter')
        }),
        divider: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'divider')
        }),
        total: defineStyle({
          ...getColorSchemePart(colorScheme, 'total')
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      container: defineStyle({
        // ...
      }),
      counter: defineStyle({
        // ...
      }),
      divider: defineStyle({
        // ...
      }),
      total: defineStyle({
        // ...
      })
    })
  },
  defaultProps: {
    variant: 'default',
    size: 'default',
    colorScheme: 'default'
  }
})
