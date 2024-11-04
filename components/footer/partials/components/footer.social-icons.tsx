import React from 'react'

import { ExternalLinkIcon } from 'lucide-react'
import { Flex } from '@chakra-ui/react'

import styles from '../../footer.styles'

const SocialIcons: React.FC = () => {
  return (
    <Flex {...styles.socialIconsContainer}>
      <ExternalLinkIcon {...styles.socialIcon} />
      <ExternalLinkIcon {...styles.socialIcon} />
      <ExternalLinkIcon {...styles.socialIcon} />
      <ExternalLinkIcon {...styles.socialIcon} />
    </Flex>
  )
}

export default SocialIcons
