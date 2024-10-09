// eslint-disable
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { ModalProps as ChakraModalProps, defineStyle } from '@chakra-ui/react'

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

import { pageSpaces } from '../../foundations/sizes'

import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorSchemeParts } from '../../themeTools'

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
  })
}
type ModalProps = ThemeVariantProps &
  Omit<ChakraModalProps, 'children' | 'isOpen' | 'onClose' | keyof ThemeVariantProps>

export default defineMultiStyleConfig({
  baseStyle: (props: ModalProps): ThemeObject => {
    const { isCentered, scrollBehavior, size } = props

    return definePartsStyle({
      overlay: defineStyle({
        pos: 'fixed',
        left: '0',
        top: '0',
        zIndex: 'modal',
        w: '100vw',
        h: '100dvh'
      }),
      dialogContainer: defineStyle({
        display: 'flex',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 'modal',
        overflow: scrollBehavior === 'inside' ? 'hidden' : 'auto',
        overscrollBehaviorY: 'none',
        py: size === 'full' ? 0 : 16,
        px: size === 'full' ? 0 : pageSpaces.x,
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: isCentered ? 'center' : 'flex-start',
        w: '100vw',
        h: '100dvh'
      }),
      dialog: defineStyle({
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        outline: 0,
        borderRadius: 'md',
        px: '6',
        py: '4',
        zIndex: 'modal',
        maxH: scrollBehavior === 'inside' ? '100%' : undefined,
        flex: 0
      }),
      header: defineStyle({
        flex: 0,
        pb: '4',
        fontSize: 'xl',
        fontWeight: 'semibold'
      }),
      body: defineStyle({
        flex: '1',
        overflow: scrollBehavior === 'inside' ? 'auto' : undefined
      }),
      closeButton: defineStyle({
        position: 'absolute',
        top: '2',
        insetEnd: '3'
      }),
      footer: defineStyle({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pt: '4'
      })
    })
  },
  sizes: {
    xs: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: 'xs' })
    }),
    sm: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: 'sm' })
    }),
    md: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: 'md' })
    }),
    lg: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: 'lg' })
    }),
    xl: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: 'xl' })
    }),
    '4xl': definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: '4xl' })
    }),
    full: definePartsStyle({
      dialog: defineStyle({ w: '100%', maxW: '100vw', minH: '100dvh', my: '0', borderRadius: '0' })
    })
  },
  variants: {
    default: (props: ModalProps): ThemeObject => {
      const colorScheme = getColorSchemeParts(props.colorScheme, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    }
  },
  defaultProps: {
    size: 'xs',
    variant: 'default',
    colorScheme: 'primary'
  }
})
