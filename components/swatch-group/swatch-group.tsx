import React from 'react'

import {Flex, HStack} from '@chakra-ui/react'
import {
    RadioCardItem,
    RadioCardLabel,
    RadioCardRoot,
} from "@/components/ui/radio-card"
import Image from 'next/image';

type SwatchGroupProps = {
  name?: string
  values: CommerceSDK.VariationAttributeValue[]
  selectedValue: CommerceSDK.VariationAttributeValue
}

const SwatchGroup: React.FC<SwatchGroupProps> = (props: SwatchGroupProps) => {
  const { name, values, selectedValue } = props
  const defaultValue = selectedValue?.value || ''

  return (
    <Flex direction="column" gap={2}>
        <RadioCardRoot
            orientation="horizontal"
            align="center"
            justify="center"
            maxW="lg"
            name={name}
            defaultValue={defaultValue}
        >
            <RadioCardLabel>
                {name}
                {selectedValue?.name ? `: ${selectedValue.name}` : ''}
            </RadioCardLabel>
            <HStack align="stretch">
                {values.map((variationAttributeValue: CommerceSDK.VariationAttributeValue) => {
                    const { href, name, image, value, orderable } = variationAttributeValue

                    console.log(href)

                    return (
                        <RadioCardItem
                            label={name}
                            indicator={false}
                            key={name}
                            value={value}
                            disabled={!orderable}
                        >
                            {image ? (
                                <Image
                                    alt={image.alt || ''}
                                    height="40"
                                    width="40"
                                    src={image.disBaseLink || image.link}
                                />
                            ) : null}
                        </RadioCardItem>
                    )
                })}
            </HStack>
        </RadioCardRoot>
    </Flex>
  )
}

export default SwatchGroup
