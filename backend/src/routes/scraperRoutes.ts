import { Router } from 'express';
import { keywordCheck } from '../middlewares/keywordCheck';
import { getScraperData } from '../controller/scraperController';

const router: Router = Router();

/**
 * GET /api/scraper?keyword=...
 * @description Scrape Amazon products based on keyword
 * @queryParam {string} keyword - Search term to scrape
 * @middleware keywordCheck - Validates the keyword parameter
 * @returns {ScraperResult[]} Array of scraped products
 */
router.get('/scraper', keywordCheck, getScraperData);

export default router;
