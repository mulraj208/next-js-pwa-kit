import { CloseButtonProps, defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { cssVar } from '@chakra-ui/theme-tools'

import { ThemeObject } from '../../theme.interfaces'

import { getColorScheme } from '../../themeTools'

const $size = cssVar('close-button-size')
const $bg = cssVar('close-button-bg')

const colorSchemes = {
  primary: defineStyle({
    _hover: {
      [$bg.variable]: 'colors.blackAlpha.100'
    },
    _active: {
      [$bg.variable]: 'colors.blackAlpha.200'
    },
    bg: $bg.reference
  })
}

export default defineStyleConfig({
  baseStyle: defineStyle({
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 'md',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    _focusVisible: {
      boxShadow: 'outline'
    }
  }),
  variants: {
    default: (props: CloseButtonProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)

      return defineStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    lg: defineStyle({
      w: [$size.reference],
      h: [$size.reference],
      [$size.variable]: 'sizes.10',
      fontSize: 'md'
    }),
    md: defineStyle({
      w: [$size.reference],
      h: [$size.reference],
      [$size.variable]: 'sizes.8',
      fontSize: 'xs'
    }),
    sm: defineStyle({
      w: [$size.reference],
      h: [$size.reference],
      [$size.variable]: 'sizes.6',
      fontSize: '2xs'
    })
  },
  defaultProps: {
    colorScheme: 'primary',
    variant: 'default',
    size: 'md'
  }
})
