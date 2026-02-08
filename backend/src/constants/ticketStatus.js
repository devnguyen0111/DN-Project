export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  CLOSED: "closed",
};

export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const isValidTicketStatus = (status) => {
  return Object.values(TICKET_STATUS).includes(status);
};

export const isValidTicketPriority = (priority) => {
  return Object.values(TICKET_PRIORITY).includes(priority);
};
