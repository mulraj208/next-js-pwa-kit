import { BoxProps, FlexProps, HeadingProps, IconProps, InputProps } from '@chakra-ui/react'

const container: BoxProps = {
  w: 'full',
  bg: 'gray.900',
  py: { base: 8, lg: 10 }
}

const content: BoxProps = {
  maxWidth: 'container.xl',
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

const socialIcon: IconProps = {
  cursor: 'pointer',
  w: 6,
  h: 6
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
