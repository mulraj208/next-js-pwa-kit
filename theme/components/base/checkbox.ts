import { checkboxAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  primary: definePartsStyle({
    control: defineStyle({
      borderColor: 'gray.200',
      color: 'white',
      _disabled: {
        bg: 'gray.100',
        borderColor: 'gray.100'
      },
      _invalid: {
        borderColor: 'red.500'
      },
      _checked: {
        bg: 'blue.500',
        borderColor: 'blue.500',
        color: 'white',
        _hover: {
          bg: 'blue.600',
          borderColor: 'blue.600'
        },
        _disabled: {
          bg: 'gray.100',
          borderColor: 'gray.100',
          color: 'gray.500'
        }
      },
      _indeterminate: {
        bg: 'blue.500',
        borderColor: 'blue.500',
        color: 'white'
      }
    }),
    label: defineStyle({
      color: 'black'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    icon: defineStyle({
      transitionProperty: 'transform',
      transitionDuration: 'normal'
    }),
    container: defineStyle({
      _disabled: { cursor: 'not-allowed' }
    }),
    control: defineStyle({
      transitionProperty: 'box-shadow',
      transitionDuration: 'normal',
      border: '2px',
      borderRadius: 'sm',
      _focusVisible: {
        boxShadow: 'outline'
      }
    }),
    label: defineStyle({
      userSelect: 'none',
      _disabled: { opacity: 0.4 }
    })
  }),
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    sm: definePartsStyle({
      control: defineStyle({ w: 3.5, h: 3.5 }),
      label: defineStyle({ fontSize: 'md' }),
      icon: defineStyle({ fontSize: '3xs' })
    }),
    md: definePartsStyle({
      control: defineStyle({ w: 5, h: 5 }),
      label: defineStyle({ fontSize: 'md' }),
      icon: defineStyle({ fontSize: '2xs' })
    }),
    lg: definePartsStyle({
      control: defineStyle({ w: 6, h: 6 }),
      label: defineStyle({ fontSize: 'md' }),
      icon: defineStyle({ fontSize: 'xs' })
    })
  },
  defaultProps: {
    size: 'sm',
    variant: 'default',
    colorScheme: 'primary'
  }
})
