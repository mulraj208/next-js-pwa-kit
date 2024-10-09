import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

const EmblaDotsAnatomy = anatomy('emblaDots').parts('container', 'dot')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(EmblaDotsAnatomy.keys)

const colorSchemes = {
  default: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    dot: defineStyle({
      bg: 'base.dark',
      '&[data-selected="true"]': {
        opacity: '0.5'
      }
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    dot: defineStyle({
      // ...
    })
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        container: defineStyle({
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          ...getColorSchemePart(colorScheme, 'container')
        }),
        dot: defineStyle({
          '&[data-selected="false"]': {
            cursor: 'pointer'
          },
          ...getColorSchemePart(colorScheme, 'dot')
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      container: defineStyle({
        // ...
      }),
      dot: defineStyle({
        w: '1rem',
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
