import React from 'react'

import { Button, HStack, Input, UseNumberInputProps, useNumberInput } from '@chakra-ui/react'

import styles from './quantity-stepper.styles'

interface QuantityStepperProps extends UseNumberInputProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const QuantityStepper: React.FC<QuantityStepperProps> = props => {
  const buttonProps = {
    colorScheme: 'secondary',
    variant: 'outline',
    ...styles.buttonStyles
  }

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    ...props,
    focusInputOnChange: false,
    onFocus: e => {
      const { onFocus } = props

      // This is useful for mobile devices, this allows the user to pop open the keyboard and set the
      // new quantity with one click.
      e.target.select()

      // If there is a `onFocus` property define, call it with the event captured.
      onFocus?.(e)
    }
  })

  const incrementButtonProps = getIncrementButtonProps({
    ...buttonProps,
    'aria-label': 'Increase Quantity'
  })

  const decrementButtonProps = getDecrementButtonProps({
    ...buttonProps,
    'aria-label': 'Decrease Quantity'
  })

  const inputProps = getInputProps({
    'aria-label': 'Quantity',
    ...styles.inputStyles
  })

  // Accessibility improvements:
  // 1. Allow keyboard focus on the buttons - Chakra overrides values passed to get*ButtonProps()
  incrementButtonProps.tabIndex = 0
  decrementButtonProps.tabIndex = 0

  // 2. Allow Space or Enter key to trigger buttons
  incrementButtonProps.onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.key = 'ArrowUp'

      if (typeof inputProps?.onKeyDown === 'function') {
        inputProps?.onKeyDown(evt)
      }
    }
  }

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
      <Input {...inputProps} />
      <Button {...incrementButtonProps}>+</Button>
    </HStack>
  )
}

export default QuantityStepper
