import { tagAnatomy as parts } from '@chakra-ui/anatomy'
import { StyleFunctionProps, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'
// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)
const colorSchemes = {
  default: definePartsStyle({
    container: defineStyle({
      '& > svg': {
        color: 'base.grey'
      }
    }),
    label: defineStyle({
      // ...
    }),
    closeButton: defineStyle({
      // ...
    })
  })
}
export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      '& > svg': {
        fontSize: 'md'
      },
      '& > svg:nth-child(1)': {
        marginInlineEnd: '0.625rem'
      },
      '& > svg:nth-child(2)': {
        marginInlineStart: '0.625rem'
      }
    }),
    label: defineStyle({
      fontWeight: 'normal'
    }),
    closeButton: defineStyle({
      w: '1.25rem',
      h: '1.25rem',
      marginInlineStart: '0.625rem'
    })
  }),
  variants: {
    default: (props: StyleFunctionProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)
      return definePartsStyle({
        container: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'container')
        }),
        label: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'label')
        }),
        closeButton: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'closeButton')
        })
      })
    }
  },
  sizes: {
    lg: definePartsStyle({
      container: defineStyle({
        px: '0.5rem',
        py: '0.25rem'
      }),
      label: defineStyle({
        fontSize: 'lg',
        lineHeight: '1.6875rem'
      }),
      closeButton: defineStyle({
        // ...
      })
    }),
    md: definePartsStyle({
      container: defineStyle({
        px: '0.5rem',
        py: '0.25rem'
      }),
      label: defineStyle({
        fontSize: 'md',
        lineHeight: 'base'
      }),
      closeButton: defineStyle({
        // ...
      })
    }),
    sm: definePartsStyle({
      container: defineStyle({
        px: '0.5rem',
        py: '0.125rem'
      }),
      label: defineStyle({
        fontSize: 'sm',
        lineHeight: '1.3125rem'
      }),
      closeButton: defineStyle({
        // ...
      })
    })
  },
  defaultProps: {
    size: 'lg',
    variant: 'default',
    colorScheme: 'default'
  }
})
