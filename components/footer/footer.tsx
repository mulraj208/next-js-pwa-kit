'use client';

import React from 'react'
import { Box, Divider, HStack, SimpleGrid, Spacer, Text, useBreakpointValue } from '@chakra-ui/react'
import { AccountLinks, CompanyLinks, CustomerSupportLinks, LegalLinks } from './partials/components/footer.links'
import SocialIcons from './partials/components/footer.social-icons'
import Subscribe from './partials/components/footer.subscribe'
import { HideOnDesktop, HideOnMobile } from '../responsive'

import styles from './footer.styles'

const Footer: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Box as="footer" layerStyle="page-spacer-x" {...styles.container}>
      <Box {...styles.content}>
        <HideOnMobile>
          <SimpleGrid columns={4} spacing={3}>
            <CustomerSupportLinks spacing={3} />
            <AccountLinks spacing={3} />
            <CompanyLinks spacing={3} />
            <Subscribe />
          </SimpleGrid>
        </HideOnMobile>

        <HideOnDesktop>
          <Subscribe />
          {/* Icons are temporarily all set as 'ExternalLinkIcon' as placholder
                            and have no function */}
          <SocialIcons />
        </HideOnDesktop>

        <HideOnMobile>
          <HStack>
            <Spacer />
            {/* Icons are temporarily all set as 'ExternalLinkIcon' as placholder
                            and have no function */}
            <SocialIcons />
          </HStack>
        </HideOnMobile>

        <Divider bg="white" h={0.5} my={8} />

        {/* Legal Links */}
        <Box maxWidth="container.xl">
          <Text color="gray.50" fontSize="sm" mb={6}>
            <span>&copy;</span>
            {`${new Date().getFullYear()} `}

            Salesforce or its affiliates. All rights reserved. This is a demo store only. Orders made WILL NOT be processed.
          </Text>

          <LegalLinks linkListVariant={isMobile ? 'vertical' : 'horizontal'} />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
