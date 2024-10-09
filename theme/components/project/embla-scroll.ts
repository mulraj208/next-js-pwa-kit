import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorScheme = {
  default: defineStyle({})
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    // ...
    opacity: '1',
    transitionDuration: 'slow'
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const scheme = getColorScheme(props.colorScheme, colorScheme)
      return defineStyle({
        '&[data-available="false"]': {
          opacity: '0.35'
        },
        ...scheme
      })
    }
  },
  sizes: {
    sm: defineStyle({
      // ...
    }),
    md: defineStyle({
      // ...
    }),
    lg: defineStyle({
      // ...
    })
  },
  defaultProps: {
    variant: 'default',
    size: 'md'
  }
})
