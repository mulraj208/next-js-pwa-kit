import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  default: defineStyle({
    color: 'black'
  }),
  nav_item: defineStyle({
    color: 'gunmetal.700',

    _hover: {
      color: 'gunmetal.500'
    },

    _active: {
      color: 'gunmetal.800'
    }
  }),
  nav_item_selected: defineStyle({
    color: 'carminepink.900',

    _hover: {
      color: 'carminepink.700'
    },

    _active: {
      color: 'carminepink.800'
    }
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    lineHeight: 'base',
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
