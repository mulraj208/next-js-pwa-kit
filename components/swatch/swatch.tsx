import React from 'react'

import {RadioCardItem} from "@/components/ui/radio-card";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface SwatchProps {
    variationAttributeValue: CommerceSDK.VariationAttributeValue
}

const Swatch = (props: SwatchProps) => {
    const {variationAttributeValue} = props;
    const {href, name, image, value, orderable} = variationAttributeValue
    const router = useRouter();

    const handleOnChange = () => {
        router.replace(href)
    }

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

    return (
        <RadioCardItem
            label={name}
            indicator={false}
            key={name}
            value={value}
            disabled={!orderable}
            css={styles}
            onChange={handleOnChange}
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
}

export default Swatch
