import { ButtonProps, InputProps } from '@chakra-ui/react'

const buttonStyles: ButtonProps = {
  borderColor: 'blue.600',
  px: 2,
  h: 11,
  w: 11,
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed'
  }
}

const inputStyles: InputProps = {
  maxWidth: 11,
  textAlign: 'center',
  px: 2,
  bg: 'white',
  borderColor: 'gray.500'
}

const styles = {
  buttonStyles,
  inputStyles
}

export default styles
