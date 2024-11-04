import React from 'react'

import { Button, HStack, Input, NumberInputRootProps, useNumberInput } from '@chakra-ui/react'

// import styles from './quantity-stepper.styles'

interface QuantityStepperProps extends NumberInputRootProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const QuantityStepper: React.FC<QuantityStepperProps> = props => {
  // const buttonProps = {
  //   colorScheme: 'secondary',
  //   variant: 'outline',
  //   ...styles.buttonStyles
  // }

  const { getInputProps, getIncrementTriggerProps, getDecrementTriggerProps } = useNumberInput({
    ...props,
    focusInputOnChange: false
  })

  const incrementButtonProps = getIncrementTriggerProps()
  const decrementButtonProps = getDecrementTriggerProps()
  const inputProps = getInputProps()

  // Accessibility improvements:
  // 1. Allow keyboard focus on the buttons - Chakra overrides values passed to get*ButtonProps()
  incrementButtonProps.tabIndex = 0
  decrementButtonProps.tabIndex = 0

  // 2. Allow Space or Enter key to trigger buttons
  // @ts-expect-error - Fix this later
  incrementButtonProps.onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.key = 'ArrowUp'

      if (typeof inputProps?.onKeyDown === 'function') {
        inputProps?.onKeyDown(evt)
      }
    }
  }

  // @ts-expect-error - Fix this later
  decrementButtonProps.onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.key = 'ArrowDown'

      if (typeof inputProps?.onKeyDown === 'function') {
        inputProps?.onKeyDown(evt)
      }
    }
  }

  return (
    <HStack>
      <Button {...decrementButtonProps}>-</Button>
      {/* @ts-expect-error - Fix this later */}
      <Input {...inputProps} />
      <Button {...incrementButtonProps}>+</Button>
    </HStack>
  )
}

export default QuantityStepper
