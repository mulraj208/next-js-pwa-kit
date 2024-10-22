import React from 'react'

import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'

import styles from '../../footer.styles'

const Subscribe: React.FC = () => {

  return (
    <Flex {...styles.subscribe}>
      <Heading color="white" fontSize="md">
          Be the first to know
      </Heading>

      <Text color="white" fontSize="sm">
          Sign up to stay in the loop about the hottest deals
      </Text>

      <Box>
        <InputGroup>
          <Input
            {...styles.subscribeField}
            aria-label="Email"
            placeholder="you@email.com"
            type="email"
          />

          <InputRightElement w="unset">
            <Button colorScheme="gray" maxHeight="full" variant="outline">
                Sign Up
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  )
}

export default Subscribe
