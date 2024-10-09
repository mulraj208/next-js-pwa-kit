import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  primary: defineStyle({
    bg: 'white'
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    top: 6,
    left: 6,
    borderRadius: 'base',
    zIndex: 'skipLink',
    _focus: {
      boxShadow: 'outline'
    }
  }),
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)

      return defineStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    default: defineStyle({
      p: 4
    })
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
    colorScheme: 'primary'
  }
})
