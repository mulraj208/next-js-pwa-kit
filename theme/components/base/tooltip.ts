import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { cssVar } from '@chakra-ui/theme-tools'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const $arrowBg = cssVar('popper-arrow-bg')

const colorSchemes = {
  primary: defineStyle({
    [$arrowBg.variable]: 'colors.gray.700',
    bg: $arrowBg.reference,
    color: 'whiteAlpha.900'
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    p: '2',
    borderRadius: 'sm',
    boxShadow: 'md',
    zIndex: 'tooltip'
  }),
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)

      return defineStyle({ ...colorScheme })
    }
  },
  sizes: {
    default: defineStyle({
      fontSize: 'sm',
      fontWeight: 'medium',
      maxW: 'xs'
    })
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
    colorScheme: 'primary'
  }
})
