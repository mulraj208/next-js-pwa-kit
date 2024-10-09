import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'

import { getColorScheme } from '../../themeTools'

const colorSchemes = {
  primary: defineStyle({
    bg: 'blue.600',
    color: 'white',
    _hover: {
      bg: 'blue.800'
    },
    _active: {
      bg: 'blue.900'
    },
    _disabled: {
      bg: 'gray.200',
      _hover: {
        cursor: 'default'
      }
    }
  }),
  secondary: defineStyle({
    bg: 'white',
    color: 'blue.600',
    _hover: {
      bg: 'blue.50'
    },
    _active: {
      bg: 'blue.100'
    },
    _disabled: {
      bg: 'gray.50',
      color: 'gray.300',
      _hover: {
        cursor: 'default'
      }
    }
  }),
  clear: defineStyle({
    color: 'blue.600',
    bg: 'transparent',
    _hover: {
      bg: 'transparent'
    },
    _active: {
      bg: `transparent`
    },
    _disabled: {
      bg: 'transparent',
      _hover: {
        cursor: 'default'
      }
    }
  }),
  ghost: defineStyle({
    color: 'gray.800',
    bg: 'transparent',
    _hover: {
      bg: 'blackAlpha.50'
    },
    _active: {
      bg: `blackAlpha.200`
    },
    _disabled: {
      color: 'gray.300',
      bg: 'gray.50',
      _hover: {
        cursor: 'default'
      }
    }
  }),
  image: defineStyle({
    bg: 'transparent',
    _hover: {
      opacity: 0.3
    },
    _active: {
      opacity: 0.6
    }
  }),
  gray: defineStyle({
    bg: 'gray.100',
    color: 'black',
    _hover: {
      bg: 'gray.200'
    },
    _active: {
      bg: 'gray.300'
    }
  })
}

export default defineStyleConfig({
  baseStyle: (props: ThemeVariantProps): ThemeObject => {
    const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
    return defineStyle({
      fontWeight: 'bold',
      borderRadius: 'base',
      transition: 'normal',
      _focusVisible: {
        boxShadow: 'outline'
      },
      ...colorScheme
    })
  },
  variants: {
    link: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        ...colorScheme,
        _hover: {
          textDecoration: 'underline'
        },
        _disabled: {
          _hover: {
            textDecoration: 'none'
          }
        }
      })
    },
    outline: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        ...colorScheme,
        border: '1px solid',
        borderColor: 'gray.200',
        _disabled: {
          bg: 'white'
        }
      })
    },
    capsule: (props: ThemeVariantProps): ThemeObject => {
      const colorScheme = getColorScheme(props.colorScheme, colorSchemes)
      return defineStyle({
        borderRadius: 'full',
        ...colorScheme
      })
    },
    noStyles: () => {
      return defineStyle({
        borderRadius: 0,
        display: 'block'
      })
    }
  },
  sizes: {
    sm: defineStyle({
      h: '1.5rem',
      px: 2
    }),
    md: defineStyle({
      h: '2rem',
      px: 3
    }),
    lg: defineStyle({
      h: '2.75rem',
      px: 4
    }),
    xl: defineStyle({
      h: '3rem',
      px: 6
    })
  },
  defaultProps: {
    colorScheme: 'primary',
    size: 'xl'
  }
})
