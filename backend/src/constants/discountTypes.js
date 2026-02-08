export const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
};

export const isValidDiscountType = (type) => {
  return Object.values(DISCOUNT_TYPES).includes(type);
};

export const calculateDiscount = (
  discountType,
  discountValue,
  orderAmount,
  maxDiscountValue = null,
) => {
  let discount = 0;

  if (discountType === DISCOUNT_TYPES.PERCENTAGE) {
    discount = (orderAmount * discountValue) / 100;
    if (maxDiscountValue && discount > maxDiscountValue) {
      discount = maxDiscountValue;
    }
  } else if (discountType === DISCOUNT_TYPES.FIXED) {
    discount = Math.min(discountValue, orderAmount);
  }

  return discount;
};
