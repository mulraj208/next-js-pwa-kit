import React, {FormEventHandler} from 'react'

import QuantityStepper from '@/components/quantity-stepper'

type ProductQuantityStepperProps = {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  stepQuantity: number
  minOrderQuantity: number
  stockLevel: number
}

const ProductQuantityStepper: React.FC<ProductQuantityStepperProps> = props => {
  const { quantity, setQuantity, stepQuantity, minOrderQuantity, stockLevel } = props
  const isOutOfStock = stockLevel === 0

  const handleOnBlurQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)

    // Default to `minOrderQuantity` if a user leaves the box with an invalid value
    if (!value) {
      setQuantity(minOrderQuantity)
    }
  }

  const handleOnChangeQuantity: FormEventHandler<HTMLDivElement> = (event) => {
    const stringValue = (event.target as HTMLInputElement).value;
    const quantityAsNumber = parseInt(stringValue, 10);

    // Use stringValue and quantityAsNumber as needed
    // Set the Quantity of product to value of input if value is number
    if (quantityAsNumber >= 0) {
      setQuantity(quantityAsNumber)
    } else if (stringValue === '') {
      // If the user clears the input, stringValue becomes an empty string, and we need to ensure that the quantity is not invalid.
      // Therefore, we set it to minOrderQuantity.
      setQuantity(minOrderQuantity)
    }
  };

  return (
    <QuantityStepper
      clampValueOnBlur={false}
      id="quantity"
      disabled={isOutOfStock}
      max={stockLevel}
      min={minOrderQuantity}
      step={stepQuantity}
      value={`${quantity}`}
      onBlur={handleOnBlurQuantity}
      onChange={handleOnChangeQuantity}
    />
  )
}

export default ProductQuantityStepper
