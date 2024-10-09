import { ThemeObject, ThemeVariantProps } from '../../theme.interfaces'
import { getColorScheme } from '../../themeTools'

const colorScheme: ThemeObject = {}

export default {
  baseStyle: {
    backgroundColor: 'white',
    w: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDir: 'column',
    borderRadius: 5,
    border: '1px solid',
    borderColor: 'gray.100',
    color: 'black'
  },
  variants: {
    default: (props: ThemeVariantProps): ThemeObject => {
      const scheme = getColorScheme(props.colorScheme, colorScheme)
      return {
        ...scheme
      }
    },
    light_shadow: (props: ThemeVariantProps): ThemeObject => {
      const scheme = getColorScheme(props.colorScheme, colorScheme)
      return {
        ...scheme,
        boxShadow: 'sm'
      }
    },
    error: (props: ThemeVariantProps): ThemeObject => {
      const scheme = getColorScheme(props.colorScheme, colorScheme)
      return {
        color: 'carminepink.900',
        border: '1px solid',
        borderColor: 'carminepink.900',
        ...scheme
      }
    }
  },
  sizes: {
    sm: {
      padding: 5
    },
    md: {
      padding: 9
    }
  },

  defaultProps: {
    variant: 'default',
    size: 'md'
  }
}
