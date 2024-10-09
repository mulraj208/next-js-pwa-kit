import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  default: defineStyle({
    color: 'base.dark'
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    lineHeight: 'none',
    letterSpacing: 'wider',
    transitionDuration: 'slow'
  }),
  variants: {
    default: (props: ThemeVariantProps) => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        fontFamily: 'regular',
        ...colorScheme
      })
    },
    light: (props: ThemeVariantProps) => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        fontFamily: 'light',
        ...colorScheme
      })
    },
    medium: (props: ThemeVariantProps) => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        fontFamily: 'medium',
        fontWeight: 'bold',
        ...colorScheme
      })
    },
    heavy: (props: ThemeVariantProps) => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        fontFamily: 'bold',
        ...colorScheme
      })
    },
    heavy_xl: (props: ThemeVariantProps) => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        fontFamily: 'extraBold',
        ...colorScheme
      })
    }
  },
  sizes: {
    sm: defineStyle({
      fontSize: 'xs'
    }),
    md: defineStyle({
      fontSize: 'md'
    }),
    mdx2: defineStyle({
      fontSize: '2xl'
    }),
    lg: defineStyle({
      fontSize: '4xl'
    }),
    xl: defineStyle({
      fontSize: '7xl'
    })
  },
  defaultProps: {
    colorScheme: 'default',
    variant: 'default',
    size: 'md'
  }
})
