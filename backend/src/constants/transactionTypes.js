export const TRANSACTION_TYPES = {
  DEPOSIT: "deposit",
  REFUND: "refund",
  PAYMENT: "payment",
  WITHDRAWAL: "withdrawal",
};

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};

export const isValidTransactionType = (type) => {
  return Object.values(TRANSACTION_TYPES).includes(type);
};

export const isValidTransactionStatus = (status) => {
  return Object.values(TRANSACTION_STATUS).includes(status);
};
