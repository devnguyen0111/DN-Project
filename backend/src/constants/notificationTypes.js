export const NOTIFICATION_TYPES = {
  ORDER_CONFIRMATION: "order_confirmation",
  ORDER_DELIVERED: "order_delivered",
  ORDER_REFUNDED: "order_refunded",
  TICKET_REPLY: "ticket_reply",
  TICKET_CLOSED: "ticket_closed",
  WALLET_DEPOSIT: "wallet_deposit",
  WALLET_REFUND: "wallet_refund",
  PROMOTION: "promotion",
  SYSTEM: "system",
};

export const NOTIFICATION_STATUS = {
  UNREAD: "unread",
  READ: "read",
};

export const isValidNotificationType = (type) => {
  return Object.values(NOTIFICATION_TYPES).includes(type);
};

export const isValidNotificationStatus = (status) => {
  return Object.values(NOTIFICATION_STATUS).includes(status);
};
