import React from 'react';

import {Flex, HStack} from '@chakra-ui/react';
import {
    RadioCardItem,
    RadioCardLabel,
    RadioCardRoot,
} from "@/components/ui/radio-card";
import Image from 'next/image';
import {useRouter} from "next/navigation";

type SwatchGroupProps = {
    name?: string
    values: CommerceSDK.VariationAttributeValue[]
    selectedValue: CommerceSDK.VariationAttributeValue
}

const SwatchGroup: React.FC<SwatchGroupProps> = (props: SwatchGroupProps) => {
    const {name, values, selectedValue} = props
    const defaultValue = selectedValue?.value || ''
    const router = useRouter();

    // @ts-ignore
    const handleOnChange = (e) => {
        console.log(e.target.value)
        router.push(`/${e.target.value as string}`)
    }

    return (
        <Flex direction="column" gap={2}>
            <RadioCardRoot
                orientation="horizontal"
                align="center"
                justify="center"
                maxW="lg"
                name={name}
                defaultValue={defaultValue}
                onChange={handleOnChange}
            >
                <RadioCardLabel>
                    {name}
                    {selectedValue?.name ? `: ${selectedValue.name}` : ''}
                </RadioCardLabel>
                <HStack align="stretch">
                    {values.map((variationAttributeValue: CommerceSDK.VariationAttributeValue) => {
                        const {href, name, image, value, orderable} = variationAttributeValue
                        const styles = {
                            h: 14,
                            w: 14,
                            ...(image && {
                                alignItems: 'flex-start',
                                border: 'none',
                                boxShadow: 'none',
                                '& .chakra-radio-card__itemText': {
                                    display: 'none'
                                }
                            })
                        }

                        console.log(href)

                        return (
                            <RadioCardItem
                                label={name}
                                indicator={false}
                                key={name}
                                value={value}
                                disabled={!orderable}
                                css={styles}
                                icon={image ? (
                                    <Image
                                        className="swatch-image"
                                        alt={image.alt || ''}
                                        height="34"
                                        width="34"
                                        src={image.disBaseLink || image.link}
                                        style={{ width: '34px', height: '34px', borderRadius: '9999px' }}
                                    />
                                ) : undefined}
                            />
                        )
                    })}
                </HStack>
            </RadioCardRoot>
        </Flex>
    )
}

export default SwatchGroup
