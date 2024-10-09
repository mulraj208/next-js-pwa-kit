import { StyleFunctionProps, defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { getColorScheme } from '../../themeTools'
const colorSchemes = {
  'gray-solid': defineStyle({
    bg: 'gray.500',
    borderColor: 'gray.500',
    color: 'white'
  }),
  'blue-solid': defineStyle({
    bg: 'blue.500',
    borderColor: 'blue.500',
    color: 'white'
  }),
  'red-solid': defineStyle({
    bg: 'red.500',
    borderColor: 'red.500',
    color: 'white'
  }),
  'orange-solid': defineStyle({
    bg: 'orange.500',
    borderColor: 'orange.500',
    color: 'white'
  }),
  'purple-solid': defineStyle({
    bg: 'purple.500',
    borderColor: 'purple.500',
    color: 'white'
  }),
  'green-solid': defineStyle({
    bg: 'green.500',
    borderColor: 'green.500',
    color: 'white'
  }),
  'gray-subtitle': defineStyle({
    bg: 'gray.100',
    borderColor: 'gray.100',
    color: 'gray.900'
  }),
  'blue-subtitle': defineStyle({
    bg: 'blue.100',
    borderColor: 'blue.100',
    color: 'blue.900'
  }),
  'red-subtitle': defineStyle({
    bg: 'red.100',
    borderColor: 'red.100',
    color: 'red.900'
  }),
  'orange-subtitle': defineStyle({
    bg: 'orange.100',
    borderColor: 'orange.100',
    color: 'orange.900'
  }),
  'purple-subtitle': defineStyle({
    bg: 'purple.100',
    borderColor: 'purple.100',
    color: 'purple.900'
  }),
  'green-subtitle': defineStyle({
    bg: 'blue.100',
    borderColor: 'blue.100',
    color: 'blue.900'
  }),
  'gray-outline': defineStyle({
    color: 'gray.500',
    borderColor: 'gray.500'
  }),
  'blue-outline': defineStyle({
    color: 'blue.500',
    borderColor: 'blue.500'
  }),
  'red-outline': defineStyle({
    color: 'red.500',
    borderColor: 'red.500'
  }),
  'orange-outline': defineStyle({
    color: 'orange.500',
    borderColor: 'orange.500'
  }),
  'purple-outline': defineStyle({
    color: 'purple.500',
    borderColor: 'purple.500'
  }),
  'green-outline': defineStyle({
    color: 'green.500',
    borderColor: 'green.500'
  })
}
export default defineStyleConfig({
  baseStyle: defineStyle({
    px: '0.25rem',
    borderRadius: 'sm',
    fontWeight: 'bold',
    lineHeight: 'shorter',
    fontSize: 'lg',
    border: '1px'
  }),
  variants: {
    solid: (props: StyleFunctionProps) => {
      const colorScheme = getColorScheme(`${props.colorScheme}-solid`, colorSchemes)
      return defineStyle({
        ...colorScheme
      })
    },
    rounded: (props: StyleFunctionProps) => {
      const colorScheme = getColorScheme(`${props.colorScheme}-solid`, colorSchemes)
      return defineStyle({
        borderRadius: 'full',
        px: '0',
        display: 'inline-flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...colorScheme
      })
    },
    subtitle: (props: StyleFunctionProps) => {
      const colorScheme = getColorScheme(`${props.colorScheme}-subtitle`, colorSchemes)
      return defineStyle({
        ...colorScheme
      })
    },
    outline: (props: StyleFunctionProps) => {
      const colorScheme = getColorScheme(`${props.colorScheme}-outline`, colorSchemes)
      return defineStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    default: (props: StyleFunctionProps) => {
      if (props.variant !== 'rounded') return defineStyle({})
      return defineStyle({
        w: '2rem',
        h: '2rem',
        fontSize: 'xs'
      })
    },
    sm: (props: StyleFunctionProps) => {
      if (props.variant !== 'rounded') return defineStyle({})
      return defineStyle({
        w: '1rem',
        h: '1rem',
        fontSize: '0.5rem'
      })
    }
  },
  defaultProps: {
    colorScheme: 'blue',
    variant: 'solid',
    size: 'default'
  }
})
