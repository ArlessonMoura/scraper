import { Request, Response } from 'express';
import * as scraperService from '../service/scraperService';

/**
 * Controller function for scraping Amazon data.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A Promise that resolves to an Express response object.
 */
export const getScraperData = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Get the keyword from the request query parameters.
    const keyword = req.query.keyword as string;

    // Call the scraper service to get the scraped data.
    const response = await scraperService.getScraperData(keyword);

    // If the response is falsy, return a 503 error.
    if (!response) {
      return res.status(503).json({ message: 'Service Unavailable' });
    }

    // Return the scraped data with a 200 status code.
    return res.status(200).json(response);
  } catch (err) {
    // Log any errors that occur.
    console.error('Controller error:', (err as Error).message);

    // Return a 500 error if an unexpected error occurs.
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
