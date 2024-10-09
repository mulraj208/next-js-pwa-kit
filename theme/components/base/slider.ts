import { sliderAnatomy as parts } from '@chakra-ui/anatomy'
import { SliderProps } from '@chakra-ui/react'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  default: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    track: defineStyle({
      // ...
      bg: 'gray.100'
    }),
    thumb: defineStyle({
      // ...
      bg: 'cyan.800'
    }),
    filledTrack: defineStyle({
      // ...
      bg: 'cyan.400'
    }),
    mark: defineStyle({
      // ...
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      // ...
    }),
    track: defineStyle({
      // ...
    }),
    thumb: defineStyle({
      // ...
    }),
    filledTrack: defineStyle({
      // ...
    }),
    mark: defineStyle({
      // ...
    })
  }),
  variants: {
    default: (props: ThemeVariantProps & SliderProps) => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      const styles = {
        horizontal: definePartsStyle({
          container: defineStyle({
            // ...
            ...getColorSchemePart(colorScheme, 'container')
          }),
          track: defineStyle({
            display: 'flex',
            ...getColorSchemePart(colorScheme, 'track')
          }),
          thumb: defineStyle({
            // ...
            borderRadius: 'full',
            top: 0,
            bottom: 0,
            ...getColorSchemePart(colorScheme, 'thumb')
          }),
          filledTrack: defineStyle({
            ...getColorSchemePart(colorScheme, 'filledTrack')
          }),
          mark: defineStyle({
            ...getColorSchemePart(colorScheme, 'mark')
          })
        }),

        vertical: definePartsStyle({
          container: defineStyle({
            // ...
            ...getColorSchemePart(colorScheme, 'container')
          }),
          track: defineStyle({
            display: 'flex',
            ...getColorSchemePart(colorScheme, 'track')
          }),
          thumb: defineStyle({
            // ...
            borderRadius: 'full',
            left: 0,
            right: 0,
            ...getColorSchemePart(colorScheme, 'thumb')
          }),
          filledTrack: defineStyle({
            ...getColorSchemePart(colorScheme, 'filledTrack')
          }),
          mark: defineStyle({
            ...getColorSchemePart(colorScheme, 'mark')
          })
        })
      }

      return props.orientation === 'vertical' ? styles.vertical : styles.horizontal
    }
  },
  sizes: {
    default: (props: ThemeVariantProps & SliderProps) => {
      const styles = {
        horizontal: definePartsStyle({
          container: defineStyle({
            // ...
            h: '0.5rem'
          }),
          track: defineStyle({
            // ...
            h: '0.5rem'
          }),
          thumb: defineStyle({
            // ...
            w: '1.25rem',
            h: '1.25rem'
          }),
          filledTrack: defineStyle({
            // ...
            h: '100%'
          }),
          mark: defineStyle({
            // ...
          })
        }),

        vertical: definePartsStyle({
          container: defineStyle({
            // ...
            h: '100%',
            w: '0.5rem'
          }),
          track: defineStyle({
            // ...
            h: '100%',
            w: '0.5rem'
          }),
          thumb: defineStyle({
            // ...
            w: '1.25rem',
            h: '1.25rem'
          }),
          filledTrack: defineStyle({
            // ...
            h: '100%',
            w: '0.5rem'
          }),
          mark: defineStyle({
            // ...
          })
        })
      }

      return props.orientation === 'vertical' ? styles.vertical : styles.horizontal
    }
  },
  defaultProps: {
    variant: 'default',
    size: 'default',
    colorScheme: 'default'
  }
})
