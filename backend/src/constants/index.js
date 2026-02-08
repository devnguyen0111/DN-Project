import { ROLES, ROLE_HIERARCHY, isValidRole, hasPermission } from "./roles.js";
import {
  ORDER_STATUS,
  ORDER_STATUS_FLOW,
  isValidOrderStatus,
  canTransitionTo,
} from "./orderStatus.js";
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  isValidTicketStatus,
  isValidTicketPriority,
} from "./ticketStatus.js";
import {
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  isValidTransactionType,
  isValidTransactionStatus,
} from "./transactionTypes.js";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_STATUS,
  isValidNotificationType,
  isValidNotificationStatus,
} from "./notificationTypes.js";
import {
  DISCOUNT_TYPES,
  isValidDiscountType,
  calculateDiscount,
} from "./discountTypes.js";
import { PAYMENT_METHODS, isValidPaymentMethod } from "./paymentMethods.js";

export {
  // Roles
  ROLES,
  ROLE_HIERARCHY,
  isValidRole,
  hasPermission,
  // Order Status
  ORDER_STATUS,
  ORDER_STATUS_FLOW,
  isValidOrderStatus,
  canTransitionTo,
  // Ticket
  TICKET_STATUS,
  TICKET_PRIORITY,
  isValidTicketStatus,
  isValidTicketPriority,
  // Transactions
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  isValidTransactionType,
  isValidTransactionStatus,
  // Notifications
  NOTIFICATION_TYPES,
  NOTIFICATION_STATUS,
  isValidNotificationType,
  isValidNotificationStatus,
  // Discounts
  DISCOUNT_TYPES,
  isValidDiscountType,
  calculateDiscount,
  // Payment
  PAYMENT_METHODS,
  isValidPaymentMethod,
};
