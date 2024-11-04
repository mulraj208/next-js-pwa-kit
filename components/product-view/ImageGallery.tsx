import {AspectRatio, Box, Button, Flex, ListItem, ListRoot} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {findImageGroupBy} from "@/utils/image-groups-utils";
import styles from './image-gallery.styles'
import Image from "next/image";

type ImageGalleryProps = {
    imageGroups: Array<CommerceSDK.ImageGroup>
    selectedVariationAttributes: Array<string>
    isLazy?: boolean
    product: CommerceSDK.Product$0
}

const ImageViewType = {
    LARGE: 'large',
    SMALL: 'small'
}

const ImageGallery: React.FC<ImageGalleryProps> = props => {
    const {imageGroups, selectedVariationAttributes = {}, isLazy = false, product} = props
    const [selectedIndex, setSelectedIndex] = useState(0)

    const heroImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: ImageViewType.LARGE,
                selectedVariationAttributes
            }),
        [imageGroups, selectedVariationAttributes]
    )

    const thumbnailImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: ImageViewType.SMALL,
                selectedVariationAttributes
            }),
        [imageGroups, selectedVariationAttributes]
    )

    const heroImage = heroImageGroup?.images?.[selectedIndex]
    const thumbnailImages = thumbnailImageGroup?.images || []
    const loadingStrategy = isLazy ? 'lazy' : 'eager'

    const handleThumbnailClick = (index: number) => setSelectedIndex(index)
    const handleThumbnailEnter = (index: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            return setSelectedIndex(index)
        }
    }

    return (
        <Flex direction="column">
            {heroImage ? (
                <Box mb={2}>
                    <AspectRatio ratio={1}>
                        <Image
                            src={heroImage.disBaseLink || heroImage.link}
                            className="block rounded-lg grayscale"
                            alt={heroImage.alt || product.name || 'Image'}
                            width={480}
                            height={480}
                            priority
                        />
                    </AspectRatio>
                </Box>
            ) : null}

            <ListRoot display="flex" flexWrap="wrap">
                {thumbnailImages.map((image, index) => {
                    const selected = index === selectedIndex
                    return (
                        <ListItem key={index} {...styles.thumbnailImageItem}>
                            <Button
                                aria-pressed={selected ? 'true' : 'false'}
                                borderColor={`${selected ? 'black' : ''}`}
                                borderWidth={`${selected ? '1px' : 0}`}
                                colorScheme=""
                                w="full"
                                onClick={() => handleThumbnailClick(index)}
                                onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) => handleThumbnailEnter(index, e)}
                            >
                                <AspectRatio ratio={1}>
                                    <Image alt={image.alt || ''} loading={loadingStrategy} height={100} width={100}
                                         src={image.disBaseLink || image.link}/>
                                </AspectRatio>
                            </Button>
                        </ListItem>
                    )
                })}
            </ListRoot>
        </Flex>
    )
}

export default ImageGallery