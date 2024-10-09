import { RadioProps } from '@chakra-ui/react'

const swatchStyles: RadioProps = {
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'gray.200',
  color: 'black',
  boxShadow: 'md',
  cursor: 'pointer',
  px: 5,
  py: 3,
  _hover: {
    borderColor: 'black'
  },
  _checked: {
    bg: 'black',
    color: 'white',
    borderColor: 'black'
  },
  _focusVisible: {
    boxShadow: 'outline'
  }
}

const imageSwatchStyles: RadioProps = {
  borderRadius: 'full',
  display: 'inline-flex',
  p: 1,
  height: 11,
  borderWidth: '1px',
  borderColor: 'transparent',
  cursor: 'pointer',
  _hover: {
    borderColor: 'gray.200'
  },
  _checked: {
    borderColor: 'black'
  },
  _focusVisible: {
    boxShadow: 'outline'
  }
}

const styles = {
  swatchStyles,
  imageSwatchStyles
}

export default styles
