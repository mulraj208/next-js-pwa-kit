import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  primary: defineStyle({
    color: 'gray.900'
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'semibold',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    opacity: 1,
    _disabled: {
      opacity: 0.4
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
      fontSize: 'sm',
      mr: '3',
      mb: '1'
    })
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
    colorScheme: 'primary'
  }
})
