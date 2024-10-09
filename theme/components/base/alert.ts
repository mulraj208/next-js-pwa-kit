import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import { StyleFunctionProps, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

import { getColorSchemeParts } from '../../themeTools'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const statusAndColorSchemeMapping: { [status: string]: string } = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue'
}

const solidColorSchemeCommonStyles = {
  title: { color: `white` },
  icon: { color: `white` },
  spinner: { color: `white` }
}

const colorSchemes = {
  'red-subtle': defineStyle({
    container: { bg: 'red.100' },
    icon: { color: 'red.600' }
  }),
  'yellow-subtle': defineStyle({
    container: { bg: 'yellow.100' },
    icon: { color: 'yellow.600' }
  }),
  'blue-subtle': defineStyle({
    container: { bg: 'blue.100' },
    icon: { color: 'blue.600' }
  }),
  'green-subtle': defineStyle({
    container: { bg: 'green.100' },
    icon: { color: 'green.600' }
  }),
  'orange-subtle': defineStyle({
    container: { bg: 'orange.100' },
    icon: { color: 'orange.600' }
  }),

  'red-solid': defineStyle({
    container: { bg: 'red.600', color: `white` },
    ...solidColorSchemeCommonStyles
  }),
  'yellow-solid': defineStyle({
    container: { bg: 'yellow.600', color: `white` },
    ...solidColorSchemeCommonStyles
  }),
  'blue-solid': defineStyle({
    container: { bg: 'blue.600', color: `white` },
    ...solidColorSchemeCommonStyles
  }),
  'green-solid': defineStyle({
    container: { bg: 'green.600', color: `white` },
    ...solidColorSchemeCommonStyles
  }),
  'orange-solid': defineStyle({
    container: { bg: 'orange.600', color: `white` },
    ...solidColorSchemeCommonStyles
  })
}

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      color: 'black'
    }),
    title: defineStyle({
      fontWeight: 'bold',
      lineHeight: '6',
      marginEnd: '2'
    }),
    description: defineStyle({
      lineHeight: '6'
    }),
    icon: defineStyle({
      flexShrink: 0,
      marginEnd: '3'
    }),
    spinner: defineStyle({
      flexShrink: 0,
      marginEnd: '3'
    })
  }),
  variants: {
    subtle: (props: StyleFunctionProps) => {
      const colorScheme = getColorSchemeParts(`${statusAndColorSchemeMapping[props.status]}-subtle`, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    },
    solid: (props: StyleFunctionProps) => {
      const colorScheme = getColorSchemeParts(`${statusAndColorSchemeMapping[props.status]}-solid`, colorSchemes)

      return definePartsStyle({
        ...colorScheme
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      container: defineStyle({
        px: '4',
        py: '3'
      }),
      icon: defineStyle({
        w: '5',
        h: '6'
      }),
      spinner: defineStyle({
        w: '5',
        h: '5'
      })
    })
  },
  defaultProps: {
    variant: 'subtle',
    colorScheme: 'blue',
    size: 'default'
  }
})
