import { drawerAnatomy as parts } from '@chakra-ui/anatomy'
import { DrawerProps as ChakraDrawerProps } from '@chakra-ui/react'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemePart, getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const colorSchemes = {
  primary: definePartsStyle({
    overlay: defineStyle({
      bg: 'blackAlpha.600'
    }),
    dialog: defineStyle({
      bg: 'white',
      color: 'inherit',
      boxShadow: 'lg'
    })
  }),
  'mobile-navigation': definePartsStyle({
    overlay: defineStyle({
      bg: 'blackAlpha.600'
    }),
    header: defineStyle({
      boxShadow: 'base'
    }),
    dialog: defineStyle({
      bg: 'white',
      boxShadow: '12'
    })
  })
}

type DrawerProps = ThemeVariantProps &
  Omit<ChakraDrawerProps, 'children' | 'isOpen' | 'onClose' | keyof ThemeVariantProps>

export default defineMultiStyleConfig({
  baseStyle: (props: DrawerProps): ThemeObject => {
    const { isFullHeight } = props

    return definePartsStyle({
      overlay: defineStyle({
        zIndex: 'modal'
      }),
      dialogContainer: defineStyle({
        display: 'flex',
        zIndex: 'modal',
        justifyContent: 'center'
      }),
      dialog: defineStyle({
        ...(isFullHeight ? { height: '100dvh' } : {}),
        zIndex: 'modal'
      }),
      header: defineStyle({
        fontWeight: 'semibold'
      }),
      body: defineStyle({
        flex: '1',
        overflow: 'auto'
      }),
      closeButton: defineStyle({
        position: 'absolute',
        top: 5,
        right: 5
      })
    })
  },
  sizes: {
    xs: definePartsStyle({
      dialog: defineStyle({ maxW: 'xs', maxH: '100dvh' })
    }),
    sm: definePartsStyle({
      dialog: defineStyle({ maxW: 'sm', maxH: '100dvh' })
    }),
    md: definePartsStyle({
      dialog: defineStyle({ maxW: 'md', maxH: '100dvh' })
    }),
    lg: definePartsStyle({
      dialog: defineStyle({ maxW: 'lg', maxH: '100dvh' })
    }),
    xl: definePartsStyle({
      dialog: defineStyle({ maxW: 'xl', maxH: '100dvh' })
    }),
    full: definePartsStyle({
      dialog: defineStyle({ maxW: '100vw', h: '100dvh', maxH: '100dvh' })
    }),
    'mobile-navigation': definePartsStyle({
      header: defineStyle({
        py: 3,
        px: 4
      }),
      body: defineStyle({
        p: 4
      }),
      dialog: defineStyle({
        maxWidth: { base: '86%', md: '40.5rem' },
        mr: 14
      })
    })
  },
  variants: {
    default: (props: DrawerProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    },
    'mobile-navigation': (props: DrawerProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        overlay: defineStyle({
          zIndex: 6,
          ...getColorSchemePart(colorScheme, 'overlay')
        }),
        header: defineStyle({
          ...getColorSchemePart(colorScheme, 'header')
        }),
        dialog: defineStyle({
          ...getColorSchemePart(colorScheme, 'dialog')
        })
      })
    }
  },
  defaultProps: {
    size: 'xs',
    variant: 'default',
    colorScheme: 'primary'
  }
})
