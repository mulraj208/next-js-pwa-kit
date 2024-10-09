import React from 'react'

import { createIcon } from '@chakra-ui/icons'

export const LockIcon = createIcon({
  displayName: 'LockIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      clipRule="evenodd"
      d="M12 2C8.68629 2 6 4.68629 6 8V10C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10V8C18 4.68629 15.3137 2 12 2ZM18 12V20H6V12H18ZM8 8V10H16V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  )
})