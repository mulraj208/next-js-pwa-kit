import {Box, HStack, Stack, Flex} from "@chakra-ui/react"
import {
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from "@/components/ui/skeleton"

const ProductViewSkeleton = () => {
    return (
        <Flex bg="blackAlpha.50" direction={{base: 'column', lg: 'row'}} gap={8} p={8} justify="center">
            {/* Left side: Image skeleton */}
            <Box flex="1" maxW="30rem">
                <Skeleton height="400px" width="100%" borderRadius="md" />
                <HStack mt="4" gap="4">
                    <Skeleton height="60px" width="60px" borderRadius="md" />
                    <Skeleton height="60px" width="60px" borderRadius="md" />
                    <Skeleton height="60px" width="60px" borderRadius="md" />
                </HStack>
            </Box>

            {/* Right side: Product details skeleton */}
            <Box flex="1.5" maxW="20rem">
                {/* Breadcrumb skeleton */}
                <SkeletonText mt="4" noOfLines={1} width="200px" />

                {/* Title skeleton */}
                <SkeletonText mt="4" noOfLines={1} width="60%" />

                {/* Price skeleton */}
                <SkeletonText mt="4" noOfLines={1} width="30%" />

                {/* Color skeleton */}
                <Box mt="4">
                    <SkeletonText noOfLines={1} width="20%" />
                    <SkeletonCircle size="8" mt="2" />
                </Box>

                {/* Size options skeleton */}
                <Box mt="4">
                    <SkeletonText noOfLines={1} width="20%" />
                    <Stack direction="row" gap="4" mt="2">
                        <Skeleton height="40px" width="40px" borderRadius="md" />
                        <Skeleton height="40px" width="40px" borderRadius="md" />
                        <Skeleton height="40px" width="40px" borderRadius="md" />
                        <Skeleton height="40px" width="40px" borderRadius="md" />
                        <Skeleton height="40px" width="40px" borderRadius="md" />
                    </Stack>
                </Box>

                {/* Quantity skeleton */}
                <HStack mt="4" gap="4">
                    <Skeleton height="40px" width="40px" borderRadius="md" />
                    <Skeleton height="40px" width="60px" borderRadius="md" />
                    <Skeleton height="40px" width="40px" borderRadius="md" />
                </HStack>

                {/* Add to cart button skeleton */}
                <Skeleton height="50px" mt="4" width="100%" borderRadius="md" />
            </Box>
        </Flex>
    );
};

export default ProductViewSkeleton