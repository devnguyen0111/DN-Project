export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  DELIVERED: "delivered",
  REFUNDED: "refunded",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_FLOW = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.PAID, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PAID]: [ORDER_STATUS.DELIVERED, ORDER_STATUS.REFUNDED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.REFUNDED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

export const isValidOrderStatus = (status) => {
  return Object.values(ORDER_STATUS).includes(status);
};

export const canTransitionTo = (currentStatus, newStatus) => {
  return ORDER_STATUS_FLOW[currentStatus]?.includes(newStatus) || false;
};
