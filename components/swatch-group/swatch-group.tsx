import React from 'react';

import {Flex, HStack} from '@chakra-ui/react';
import {
    RadioCardItem,
    RadioCardLabel,
    RadioCardRoot,
} from "@/components/ui/radio-card";
import Image from 'next/image';
import {useRouter} from "next/navigation";
import Swatch from "@/components/swatch";

type SwatchGroupProps = {
    name?: string
    values: CommerceSDK.VariationAttributeValue[]
    selectedValue: CommerceSDK.VariationAttributeValue
}

const SwatchGroup: React.FC<SwatchGroupProps> = (props: SwatchGroupProps) => {
    const {name, values, selectedValue} = props
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
                    {values.map((variationAttributeValue: CommerceSDK.VariationAttributeValue) => (
                        <Swatch key={variationAttributeValue.name} variationAttributeValue={variationAttributeValue} />
                    ))}
                </HStack>
            </RadioCardRoot>
        </Flex>
    )
}

export default SwatchGroup
