import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import inputTheme from './input'

import colors from '../../foundations/colors'
import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  primary: defineStyle({
    bg: 'transparent',
    _focus: {
      borderColor: 'blue.600',
      boxShadow: `0px 0px 3px 0px ${colors.blue['500']}`
    }
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    ...inputTheme.baseStyle?.field,
    paddingY: '2',
    minHeight: '20',
    lineHeight: 'short',
    verticalAlign: 'top'
  }),
  sizes: {
    xs: inputTheme.sizes?.xs.field ?? {},
    sm: inputTheme.sizes?.sm.field ?? {},
    md: inputTheme.sizes?.md.field ?? {},
    lg: inputTheme.sizes?.lg.field ?? {}
  },
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)

      return defineStyle({
        ...colorScheme
      })
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'default',
    colorScheme: 'primary'
  }
})
