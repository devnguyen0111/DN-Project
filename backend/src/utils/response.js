/**
 * Standard API Response Format
 */
export const sendSuccess = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard API Error Response Format
 */
export const sendError = (
  res,
  message = "Error",
  statusCode = 500,
  errors = null,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Paginated Response Format
 */
export const sendPaginated = (
  res,
  data,
  page,
  limit,
  total,
  message = "Success",
  statusCode = 200,
) => {
  const totalPages = Math.ceil(total / limit);

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};

export default { sendSuccess, sendError, sendPaginated };
