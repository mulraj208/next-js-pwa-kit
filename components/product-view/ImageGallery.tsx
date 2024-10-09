import {AspectRatio, Box, Button, Flex, Img, List, ListItem} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {findImageGroupBy} from "@salesforce/retail-react-app/app/utils/image-groups-utils";
import styles from './image-gallery.styles'

type ImageGalleryProps = {
    imageGroups: Array<CommerceSDK.ImageGroup>
    selectedVariationAttributes: Array<string>
    isLazy?: boolean
}

const ImageViewType = {
    LARGE: 'large',
    SMALL: 'small'
}

const ImageGallery: React.FC<ImageGalleryProps> = props => {
    const {imageGroups, selectedVariationAttributes = {}, isLazy = false} = props
    const [selectedIndex, setSelectedIndex] = useState(0)

    const heroImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: ImageViewType.LARGE,
                selectedVariationAttributes
            }),
        [selectedVariationAttributes]
    )

    const thumbnailImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: ImageViewType.SMALL,
                selectedVariationAttributes
            }),
        [selectedVariationAttributes]
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
                        <Img alt={heroImage.alt} loading={loadingStrategy}
                             src={heroImage.disBaseLink || heroImage.link}/>
                    </AspectRatio>
                </Box>
            ) : null}

            <List display="flex" flexWrap="wrap">
                {thumbnailImages.map((image, index) => {
                    const selected = index === selectedIndex
                    return (
                        <ListItem key={index} {...styles.thumbnailImageItem}>
                            <Button
                                aria-pressed={selected ? 'true' : 'false'}
                                borderColor={`${selected ? 'black' : ''}`}
                                borderWidth={`${selected ? '1px' : 0}`}
                                colorScheme=""
                                size=""
                                variant="noStyles"
                                w="full"
                                onClick={() => handleThumbnailClick(index)}
                                onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) => handleThumbnailEnter(index, e)}
                            >
                                <AspectRatio ratio={1}>
                                    <Img alt={image.alt} loading={loadingStrategy}
                                         src={image.disBaseLink || image.link}/>
                                </AspectRatio>
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
        </Flex>
    )
}

export default ImageGallery