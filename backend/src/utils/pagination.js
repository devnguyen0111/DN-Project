/**
 * Build pagination options for MongoDB queries
 */
export const getPaginationOptions = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
  const skip = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    skip,
  };
};

/**
 * Build sort options from query string
 * @param {string} sortQuery - e.g., "name:asc" or "created_at:desc"
 */
export const getSortOptions = (sortQuery = "created_at:desc") => {
  const [field, order] = sortQuery.split(":");
  return { [field]: order === "asc" ? 1 : -1 };
};

/**
 * Calculate pagination metadata
 */
export const getPaginationMetadata = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export default { getPaginationOptions, getSortOptions, getPaginationMetadata };
