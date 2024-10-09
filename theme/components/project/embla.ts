import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

const EmblaAnatomy = anatomy('embla').parts('wrapper', 'viewport', 'container', 'slide')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(EmblaAnatomy.keys)

const colorSchemes = {
  default: definePartsStyle({
    wrapper: defineStyle({
      // ...
    }),
    viewport: defineStyle({
      // ...
    }),
    container: defineStyle({
      // ...
    }),
    slide: defineStyle({
      // ...
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    wrapper: defineStyle({
      w: '100%'
    }),
    viewport: defineStyle({
      overflow: 'hidden'
    }),
    container: defineStyle({
      backfaceVisibility: 'hidden',
      display: 'flex',
      touchAction: 'pan-y'
    }),
    slide: defineStyle({
      flex: '0 0 auto',
      minW: '0',
      minH: '0',
      position: 'relative',
      boxSizing: 'border-box'
    })
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        wrapper: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'wrapper')
        }),
        viewport: defineStyle({
          ...getColorSchemePart(colorScheme, 'viewport')
        }),
        container: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'container')
        }),
        slide: defineStyle({
          ...getColorSchemePart(colorScheme, 'slide')
        })
      })
    },
    vertical: (props: ThemeVariantProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        wrapper: defineStyle({
          // ...
          ...getColorSchemePart(colorScheme, 'wrapper')
        }),
        viewport: defineStyle({
          h: '100%',
          ...getColorSchemePart(colorScheme, 'viewport')
        }),
        container: defineStyle({
          flexDir: 'column',
          h: '100%',
          ...getColorSchemePart(colorScheme, 'container')
        }),
        slide: defineStyle({
          ...getColorSchemePart(colorScheme, 'slide')
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      slide: defineStyle({
        w: '100%'
      })
    }),
    auto: definePartsStyle({
      slide: defineStyle({
        w: 'auto',
        h: 'auto'
      })
    }),
    'x1.5': definePartsStyle({
      slide: defineStyle({
        w: '75%'
      })
    }),
    x2: definePartsStyle({
      slide: defineStyle({
        w: '50%'
      })
    }),
    x3: definePartsStyle({
      slide: defineStyle({
        w: '33.3333%'
      })
    }),
    x4: definePartsStyle({
      slide: defineStyle({
        w: '25%'
      })
    }),
    x5: definePartsStyle({
      slide: defineStyle({
        w: '20%'
      })
    }),
    x6: definePartsStyle({
      slide: defineStyle({
        w: '16.6666%'
      })
    }),
    x7: definePartsStyle({
      slide: defineStyle({
        w: '14.285714286%'
      })
    }),
    x8: definePartsStyle({
      slide: defineStyle({
        w: '12.5%'
      })
    }),
    x9: definePartsStyle({
      slide: defineStyle({
        w: '11.1111%'
      })
    }),
    x10: definePartsStyle({
      slide: defineStyle({
        w: '10%'
      })
    })
  },
  defaultProps: {
    variant: 'default',
    size: 'default',
    colorScheme: 'default'
  }
})
