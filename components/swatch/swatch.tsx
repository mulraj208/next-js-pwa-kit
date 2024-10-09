import React from 'react'
import { Box, Img, UseRadioGroupReturn, useRadio } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import styles from './swatch.styles'

interface SwatchProps extends ReturnType<UseRadioGroupReturn['getRadioProps']> {
    children: React.ReactNode
    href: string
    image?: {
        alt: string
        disBaseLink?: string
        link?: string
    }
}

const Swatch = (props: SwatchProps) => {
    const { href, image } = props
    const { getInputProps, getRadioProps } = useRadio(props)
    const router = useRouter()  // Use Next.js router for navigation
    const radioProps = getRadioProps()
    const input = getInputProps()

    console.log(href)

    const handleClick = () => {
        router.replace(href)  // Replaces useHistory with Next.js navigation
    }

    return (
        <Box aria-label={props['aria-label']} as="label">
            <input {...input} onClick={handleClick} />

            <Box {...radioProps} {...(image ? styles.imageSwatchStyles : styles.swatchStyles)}>
                {image ? (
                    <Img
                        alt={image.alt}
                        aspectRatio={1}
                        borderRadius="full"
                        height="100%"
                        src={image.disBaseLink || image.link}
                    />
                ) : (
                    props.children
                )}
            </Box>
        </Box>
    )
}

export default Swatch
