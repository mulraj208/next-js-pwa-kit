import { ListItemProps } from '@chakra-ui/react'

const thumbnailImageItem: ListItemProps = {
  flexShrink: 0,
  cursor: 'pointer',
  flexBasis: [20, 20, 24],
  borderStyle: 'solid',
  marginBottom: [1, 1, 2, 2],
  marginRight: [1, 1, 2, 2],
  _focus: {
    boxShadow: 'outline'
  },
  _focusVisible: {
    outline: 0
  }
}

const styles = {
  thumbnailImageItem
}

export default styles
