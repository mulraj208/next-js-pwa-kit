import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import colors from '../../foundations/colors'
import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  primary: definePartsStyle({
    field: defineStyle({
      bg: 'transparent',
      borderColor: 'gray.200',
      '&::file-selector-button': {
        borderRadius: 'base',
        px: 3,
        height: 'full',
        cursor: 'pointer',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.16)',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
        mr: 2,
        '&:hover': {
          backgroundColor: 'gray.50'
        },
        '&:active': {
          backgroundColor: 'gray.100'
        }
      },
      _disabled: {
        bg: 'gray.100',
        border: 'none',
        cursor: 'not-allowed'
      },
      _invalid: {
        borderColor: 'red.600',
        boxShadow: `0px 0px 3px 0px ${colors.red['600']}`
      },
      _placeholder: {
        fontSize: 'md',
        color: 'gray.300'
      },
      _focus: {
        borderColor: 'blue.600',
        boxShadow: `0px 0px 3px 0px ${colors.blue['500']}`
      }
    }),
    addon: defineStyle({ bg: 'transparent' })
  })
}

const size = {
  lg: defineStyle({
    fontSize: 'lg',
    borderRadius: 'md',
    height: 11
  }),
  md: defineStyle({
    fontSize: 'md',
    borderRadius: 'md',
    height: 10
  }),
  sm: defineStyle({
    fontSize: 'sm',
    borderRadius: 'sm',
    height: 8
  }),
  xs: defineStyle({
    fontSize: 'xs',
    borderRadius: 'sm',
    height: 6
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    addon: defineStyle({
      px: '4'
    }),
    field: defineStyle({
      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      borderWidth: '1px'
    })
  }),
  sizes: {
    lg: definePartsStyle({
      field: defineStyle({
        ...size.lg,
        px: 4,
        '&[type=file]': {
          fontSize: 'lg',
          py: 1
        },
        _placeholder: {
          fontSize: 'lg'
        }
      }),
      group: size.lg
    }),
    md: definePartsStyle({
      field: defineStyle({
        ...size.md,
        px: 4,
        '&[type=file]': {
          fontSize: 'md',
          py: 1
        },
        _placeholder: {
          fontSize: 'md'
        }
      }),
      group: size.md
    }),
    sm: definePartsStyle({
      field: defineStyle({
        ...size.sm,
        px: 3,
        '&[type=file]': {
          fontSize: 'sm',
          py: 0.5
        },
        _placeholder: {
          fontSize: 'sm'
        }
      }),
      group: size.sm
    }),
    xs: definePartsStyle({
      field: defineStyle({
        ...size.xs,
        px: 2,
        '&[type=file]': {
          fontSize: 'xs',
          py: 'px'
        },
        _placeholder: {
          fontSize: 'xs'
        }
      }),
      group: size.xs
    })
  },
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    }
  },
  defaultProps: {
    size: 'lg',
    variant: 'default',
    colorScheme: 'primary'
  }
})
