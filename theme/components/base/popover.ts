import { popoverAnatomy as part } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(part.keys)

const colorSchemes = {
  default: definePartsStyle({
    content: defineStyle({
      // ...
    }),
    header: defineStyle({
      // ...
    }),
    body: defineStyle({
      // ...
    }),
    footer: defineStyle({
      // ...
    }),
    popper: defineStyle({
      // ...
    }),
    arrow: defineStyle({
      // ...
    }),
    closeButton: defineStyle({
      // ...
    })
  }),
  category_menu: definePartsStyle({
    content: defineStyle({
      backgroundColor: 'transparent !important'
    }),
    popper: defineStyle({
      bg: 'white'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    content: defineStyle({
      // ...
    }),
    header: defineStyle({
      // ...
    }),
    body: defineStyle({
      // ...
    }),
    footer: defineStyle({
      // ...
    }),
    popper: defineStyle({
      // ...
    }),
    arrow: defineStyle({
      // ...
    }),
    closeButton: defineStyle({
      // ...
    })
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        content: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'content')
        }),
        header: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'header')
        }),
        body: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'body')
        }),
        footer: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'footer')
        }),
        popper: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'popper')
        }),
        arrow: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'arrow')
        }),
        closeButton: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'closeButton')
        })
      })
    },
    category_menu: (_props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts('category_menu', colorSchemes)

      return definePartsStyle({
        popper: defineStyle({
          borderRadius: 'base',
          boxShadow: 'category_menu',
          zIndex: 2,
          ...getColorSchemePart(colorScheme, 'popper')
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      content: defineStyle({
        // ...
      }),
      header: defineStyle({
        // ...
      }),
      body: defineStyle({
        // ...
      }),
      footer: defineStyle({
        // ...
      }),
      popper: defineStyle({
        // ...
      }),
      arrow: defineStyle({
        // ...
      }),
      closeButton: defineStyle({
        // ...
      })
    }),
    full: definePartsStyle({
      content: defineStyle({
        width: 'auto'
      }),
      popper: defineStyle({
        width: '100%',
        maxWidth: '100%'
      })
    })
  },
  defaultProps: {
    variant: 'default',
    size: 'default',
    colorScheme: 'default'
  }
})
