import { FlexProps, HeadingProps, LinkProps, PopoverContentProps, StackProps, TextProps } from '@chakra-ui/react'

export const HEADER_HOVER_DELAY = 300

const container: FlexProps = {
  minWidth: 'xs',
  width: 'full',
  display: { base: 'none', lg: 'flex' },
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  paddingLeft: 4
}

const popoverContent: PopoverContentProps = {
  border: 0,
  boxShadow: 'xl',
  py: 5,
  px: 4,
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  bg: 'white',
  cursor: 'default'
}

const menu: StackProps = {
  direction: 'row',
  flexWrap: 'wrap',
  whiteSpace: 'nowrap',
  height: 'full'
}

const menuItem: LinkProps = {
  display: 'block',
  whiteSpace: 'nowrap',
  position: 'relative',
  px: 6,
  py: 4,
  fontSize: 'md',
  fontWeight: 700,
  color: 'gray.900',
  _active: {
    bg: 'gray.100'
  },
  _hover: {
    textDecoration: 'none',
    cursor: 'pointer',
    bg: 'gray.50'
  }
}

const menuItemActive: LinkProps = {
  bg: 'gray.50',
  _before: {
    content: '" "',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '1',
    bg: 'red.900'
  }
}

const expandableMenuItem: LinkProps = {
  overflow: 'hidden',
  _before: {
    content: '" "',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '1',
    bg: 'transparent',
    transition: `all ${HEADER_HOVER_DELAY}ms cubic-bezier(0.22, 1, 0.36, 1) 0s`,
    transform: 'translateX(-100%)'
  },
  _hover: {
    _before: {
      bg: 'red.900',
      transform: 'translateX(0)'
    }
  }
}

const expandableMenuItemHint: TextProps = {
  position: 'absolute',
  width: 'px',
  height: 'px',
  margin: '-px',
  padding: 0,
  overflow: 'hidden',
  border: 0,
  clipPath: 'rect(0 0 0 0 round 0%)'
}

const categoryHeading: HeadingProps = {
  fontSize: 'md',
  marginBottom: 2,
  _hover: {
    textDecoration: 'underline'
  }
}

const styles = {
  container,
  popoverContent,
  menu,
  menuItem,
  menuItemActive,
  expandableMenuItem,
  expandableMenuItemHint,
  categoryHeading
}

export default styles
