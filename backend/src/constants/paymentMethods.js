export const PAYMENT_METHODS = {
  WALLET: "wallet",
  STRIPE: "stripe",
  PAYPAL: "paypal",
  VNPAY: "vnpay",
};

export const isValidPaymentMethod = (method) => {
  return Object.values(PAYMENT_METHODS).includes(method);
};
