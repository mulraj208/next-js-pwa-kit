import { FlexProps, InputProps, LinkProps, PopoverContentProps, SpinnerProps } from '@chakra-ui/react'

const input: InputProps = {
  width: 'full',
  outline: 'none',
  border: '2px solid',
  borderColor: 'red.300',
  borderRadius: 4,
  py: 1,
  pl: 7,
  pr: 2,
  _focusWithin: {
    borderColor: 'red.600'
  }
}

const spinner: SpinnerProps = {
  w: 14,
  h: 14,
  my: 10,
  opacity: 0.85,
  color: 'red.600',
  zIndex: 5
}

const searchResultsDesktop: PopoverContentProps = {
  bg: 'white',
  mt: 3,
  boxShadow: 'lg',
  borderRadius: 'base'
}

const searchResultsMobile: FlexProps = {
  position: 'absolute',
  bg: 'white',
  h: '100dvh',
  left: 0,
  right: 0,
  mt: 3.5
}

const suggestion: LinkProps = {
  w: 'full',
  fontSize: 'md',
  textAlign: 'left',
  pl: 0,
  mt: 0,
  _hover: {
    color: 'red.800',
    textDecoration: 'underline'
  }
}

const styles = {
  input,
  spinner,
  searchResultsDesktop,
  searchResultsMobile,
  suggestion
}

export default styles
