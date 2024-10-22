import React from 'react'

import { Box } from '@chakra-ui/react'

/**
 * Render the children in the DOM but visually hide them on desktop
 * @param children - isomorphic components used within a responsive design
 */
export const HideOnDesktop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box display={{ base: 'block', lg: 'none' }}>{children}</Box>
)

/**
 * Render the children in the DOM but visually hide them on mobile
 * @param children - isomorphic components used within a responsive design
 */
export const HideOnMobile: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box display={{ base: 'none', lg: 'block' }}>{children}</Box>
)

export default { HideOnMobile, HideOnDesktop }
