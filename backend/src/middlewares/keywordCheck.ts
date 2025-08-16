import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate the presence of a keyword query parameter
 * @returns void or Express Response with error message
 */
export const keywordCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
    return res.status(400).json({
      message: 'Keyword parameter is required and must be a non-empty string',
      example: '/api/scraper?keyword=laptop',
    });
  }

  next();
};
