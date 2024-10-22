import React from 'react'

import { Box, BoxProps, Link as ChakraLink, Heading, List } from '@chakra-ui/react'
import Link from 'next/link'

import LinkListItem from './partials/components/link-list.item'

export const LINK_LIST_VARIANTS = {
  vertical: 'vertical',
  horizontal: 'horizontal'
}
export type LinkListVariant = 'vertical' | 'horizontal'

export type Link = {
  href?: string
  text?: string
  styles?: object
}

type LinkListProps = {
  links: Array<Link>
  heading?: { href?: string; text?: string; styles?: object }
  variant?: LinkListVariant
  colorScheme?: string
  onLinkClick?: () => void
  spacing?: number
} & BoxProps

const LinksList: React.FC<LinkListProps> = props => {
  const { links = [], heading, variant, onLinkClick: handleLinkClick, colorScheme, spacing, ...rest } = props

  return (
    <Box {...rest}>
      {heading ? (
        heading.href ? (
          <ChakraLink
            aria-label={heading.text}
            as={Link}
            display="inline-flex"
            href={heading.href}
            onClick={handleLinkClick}
          >
            <Heading fontWeight="bold" py={3} {...(heading.styles ? heading.styles : {})}>
              {heading.text}
            </Heading>
          </ChakraLink>
        ) : (
          <Heading fontWeight="bold" {...(heading.styles ? heading.styles : {})}>
            {heading.text}
          </Heading>
        )
      ) : null}

      {links ? (
        <List spacing={spacing} style={variant === LINK_LIST_VARIANTS.horizontal ? { display: 'flex', gap: 3 } : {}}>
          {links.map((link, i) => (
            <LinkListItem colorScheme={colorScheme} key={i} link={link} onLinkClick={handleLinkClick} />
          ))}
        </List>
      ) : null}
    </Box>
  )
}

export default LinksList
