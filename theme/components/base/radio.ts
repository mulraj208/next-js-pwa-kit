import { radioAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import checkboxTheme from './checkbox'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

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
          bg: 'blue.500',
          color: 'white'
        }
      }
    }),
    label: defineStyle({
      color: 'black'
    })
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    label: {
      ...checkboxTheme.baseStyle?.label,
      textAlign: 'left',
      width: 'full'
    },
    container: checkboxTheme.baseStyle?.container,
    control: {
      ...checkboxTheme.baseStyle?.control,
      borderRadius: 'full',
      _checked: {
        _before: {
          content: `""`,
          display: 'inline-block',
          pos: 'relative',
          w: '50%',
          h: '50%',
          borderRadius: '50%',
          bg: 'currentColor'
        }
      },
      _disabled: {
        opacity: 0.4
      }
    }
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
    md: definePartsStyle({
      control: defineStyle({ w: '4', h: '4' }),
      label: defineStyle({ fontSize: 'md' })
    }),
    lg: definePartsStyle({
      control: defineStyle({ w: '5', h: '5' }),
      label: defineStyle({ fontSize: 'lg' })
    }),
    sm: definePartsStyle({
      control: defineStyle({ width: '3', height: '3' }),
      label: defineStyle({ fontSize: 'sm' })
    })
  },
  defaultProps: {
    size: 'md',
    variant: 'default',
    colorScheme: 'primary'
  }
})
