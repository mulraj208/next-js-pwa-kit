import { BoxProps, FlexProps, HeadingProps, InputProps } from '@chakra-ui/react'

const container: BoxProps = {
  w: 'full',
  bg: 'gray.900',
  py: { base: 8, lg: 10 },
  px: { base: 3, lg: 8 }
}

const content: BoxProps = {
  maxWidth: '75rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: 'white'
}

const subscribe: FlexProps = {
  direction: 'column',
  gap: 3,
  maxWidth: { base: '21.5rem', lg: 'none' }
}

const subscribeField: InputProps = {
  background: 'white',
  color: 'gray.900',
  width: '100%',
  paddingLeft: 3,
  py: 2,
  borderRadius: 4,
  outline: 'none'
}

const socialIconsContainer: FlexProps = {
  direction: 'row',
  justifyContent: 'start',
  marginTop: 4,
  gap: 8
}

const socialIcon = {
  cursor: 'pointer',
  width: 24,
  height: 24
}

const linksHeading: HeadingProps = {
  mb: 5,
  color: 'white'
}

const styles = {
  container,
  content,
  linksHeading,
  subscribe,
  subscribeField,
  socialIconsContainer,
  socialIcon
}

export default styles
