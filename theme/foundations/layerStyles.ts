import { pageSpaces } from './sizes'

export default {
  'page-frame': {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    w: 'full',
    h: 'full',
    minHeight: '100vh',
    bg: 'gray.100'
  },
  'page-main': {
    my: 8,
    px: pageSpaces.x,
    maxWidth: 'container.xl',
    flex: ['1 0 auto'],
    w: 'full'
  },
  'page-spacer-x': {
    px: pageSpaces.x
  },
  'page-segment': {
    w: '100%',
    maxW: 'xl',
    padding: '1.5rem',
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    py: 6,
    px: 4,
    backgroundColor: 'white',
    rounded: 'base',
    boxShadow: 'base'
  }
}
