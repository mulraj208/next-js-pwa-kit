import {AspectRatio, Box, Flex, Skeleton} from "@chakra-ui/react";

const ImageGallerySkeleton: React.FC = () => {
    return (
        <Box data-testid="sf-image-gallery-skeleton">
            <Flex flexDirection="column">
                <AspectRatio mb={2} ratio={1}>
                    <Skeleton/>
                </AspectRatio>

                <Flex>
                    {[...Array(4)].fill(0).map((_, index) => (
                        <AspectRatio
                            key={index}
                            mr={2}
                            ratio={1}
                            width={{
                                base: 20,
                                md: 24
                            }}
                        >
                            <Skeleton/>
                        </AspectRatio>
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}

export default ImageGallerySkeleton
