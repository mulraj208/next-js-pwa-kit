import React from 'react'

import { Flex, HStack, Text, useRadioGroup } from '@chakra-ui/react'

import Swatch from '../swatch'

type SwatchGroupProps = {
  name?: string
  values: CommerceSDK.VariationAttributeValue[]
  selectedValue: CommerceSDK.VariationAttributeValue
}

const SwatchGroup: React.FC<SwatchGroupProps> = (props: SwatchGroupProps) => {
  const { name, values, selectedValue } = props
  const defaultValue = selectedValue?.value || ''
  const { getRootProps, getRadioProps } = useRadioGroup({ name, defaultValue })
  const group = getRootProps()

  return (
    <Flex direction="column" gap={2}>
      <Text>
        {name}
        {selectedValue?.name ? `: ${selectedValue.name}` : ''}
      </Text>

      <HStack wrap="wrap" {...group} aria-label={name}>
        {values.map((variationAttributeValue: CommerceSDK.VariationAttributeValue) => {
          const { href, name, image, value, orderable } = variationAttributeValue
          let radioProps = getRadioProps({
            value,
            'aria-label': name,
            isDisabled: !orderable
          })

          radioProps = { ...radioProps, isChecked: value === defaultValue }

          return (
            <Swatch href={href} image={image} key={value} {...radioProps}>
              {name}
            </Swatch>
          )
        })}
      </HStack>
    </Flex>
  )
}

export default SwatchGroup
