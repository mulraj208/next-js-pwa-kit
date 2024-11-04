import { BoxProps } from '@chakra-ui/react'

const container: BoxProps = {
  position: 'sticky',
  top: 0,
  zIndex: 2,
  backgroundColor: 'white',
  minWidth: 'xs',
  width: 'full',
  shadow: 'lg',
  display: 'flex',
  alignItems: 'center',
  py: { base: 3, lg: 0 }
}

const content: BoxProps = {
  maxWidth: 'container.xl',
  mx: 'auto',
  w: 'container.xl'
}

const styles = {
  container,
  content
}

export default styles
