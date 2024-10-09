import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

const TotalsAnatomy = anatomy('totals').parts(
  'container',
  'subtotalContainer',
  'subtotal',
  'adjustment',
  'shipping',
  'tax',
  'total'
)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(TotalsAnatomy.keys)

export default defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: defineStyle({
      color: 'gray.800'
    }),
    subtotalContainer: defineStyle({
      // ...
    }),
    subtotal: defineStyle({
      fontWeight: 'bold'
    }),
    adjustment: defineStyle({
      // ...
    }),
    shipping: defineStyle({
      // ...
    }),
    tax: defineStyle({
      // ...
    }),
    total: defineStyle({
      fontWeight: 'bold'
    })
  }),
  variants: {
    main: () => {
      return definePartsStyle({
        container: defineStyle({
          // ...
        }),
        subtotalContainer: defineStyle({
          // ...
        }),
        subtotal: defineStyle({
          // ...
        }),
        adjustment: defineStyle({
          // ...
        }),
        shipping: defineStyle({
          // ...
        }),
        tax: defineStyle({
          // ...
        }),
        total: defineStyle({
          // ...
        })
      })
    },
    success: () => {
      return definePartsStyle({
        container: defineStyle({
          px: 3
        }),
        subtotalContainer: defineStyle({
          borderColor: 'black',
          py: 3
        }),
        subtotal: defineStyle({
          // ...
        }),
        adjustment: defineStyle({
          // ...
        }),
        shipping: defineStyle({
          // ...
        }),
        tax: defineStyle({
          // ...
        }),
        total: defineStyle({
          // ...
        })
      })
    }
  },
  sizes: {
    default: definePartsStyle({
      container: defineStyle({
        // ...
      }),
      subtotalContainer: defineStyle({
        // ...
      }),
      subtotal: defineStyle({
        // ...
      }),
      adjustment: defineStyle({
        // ...
      }),
      shipping: defineStyle({
        // ...
      }),
      tax: defineStyle({
        // ...
      }),
      total: defineStyle({
        // ...
      })
    })
  },
  defaultProps: {
    variant: 'main',
    size: 'default'
  }
})
