import { ThemeObject, ThemeVariantProps } from './theme.interfaces'

export default {
  styles: {
    global: (_props: ThemeVariantProps): ThemeObject => ({
      body: {}
    })
  }
}
