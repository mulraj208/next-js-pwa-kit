import React from 'react'

import { Link as ChakraLink, ListItem as ChakraListItem } from '@chakra-ui/react'
import { default as NextLink } from 'next/link';

import { Link } from '../../links-list'

type LinkListItemProps = {
  colorScheme?: string
  link: Link
  onLinkClick?: () => void
}

const LinkListItem: React.FC<LinkListItemProps> = props => {
  const { colorScheme, link, onLinkClick: handleLinkClick } = props

  return (
    <ChakraListItem>
      <ChakraLink
        _hover={{ color: colorScheme, textDecoration: 'underline' }}
        as={NextLink}
        href={link.href}
        onClick={handleLinkClick}
      >
        {link.text}
      </ChakraLink>
    </ChakraListItem>
  )
}

export default LinkListItem
