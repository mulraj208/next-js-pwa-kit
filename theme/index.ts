import { extendBaseTheme } from '@chakra-ui/react'

// Base component style
import baseComponents from './components/base'

// Custom Component
import Embla from './components/project/embla'
import EmblaCounter from './components/project/embla-counter'
import EmblaDots from './components/project/embla-dots'
import EmblaProgress from './components/project/embla-progress'
import EmblaScroll from './components/project/embla-scroll'
import SimpleCard from './components/project/simple-card'
import Totals from './components/project/totals'

// Project Component
import { foundations } from './foundations'
import GlobalStyles from './global'

const themeExt = {
  /**
   * Global Styles
   */
  ...GlobalStyles,

  /**
   * Foundations
   */
  ...foundations,

  /**
   * Components
   */
  components: {
    // Base
    ...baseComponents,

    // Custom
    SimpleCard,
    Embla,
    EmblaCounter,
    EmblaDots,
    EmblaProgress,
    EmblaScroll,
    Totals
  }
}

export const themeDefault = extendBaseTheme({ ...themeExt })

// console.log(themeDefault)
