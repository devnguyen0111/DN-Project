export const ROLES = {
  CUSTOMER: "customer",
  STAFF: "staff",
  ADMIN: "admin",
};

export const ROLE_HIERARCHY = {
  [ROLES.CUSTOMER]: 1,
  [ROLES.STAFF]: 2,
  [ROLES.ADMIN]: 3,
};

export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

export const hasPermission = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
