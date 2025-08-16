import { JSDOM } from 'jsdom';
import * as scraperModel from '../model/scraperModel';

export interface ScraperResult {
  title: string;
  rating: string;
  reviews: string;
  image: string;
}

/**
 * Fetches and parses scraped data from Amazon.
 *
 * @param {string} keyword - The search keyword to scrape.
 * @return {Promise<ScraperResult[] | null>} An array of scraped results or null if an error occurs.
 */
export const getScraperData = async (
  keyword: string,
): Promise<ScraperResult[] | null> => {
  try {
    // Construct the URL with the encoded keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Fetch the HTML content from the URL
    const html = await scraperModel.getScraperData(url);
    if (!html) return null;

    // Create a DOM object from the HTML content
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results: ScraperResult[] = [];

    // Iterate over each scraped item
    document.querySelectorAll('.s-main-slot .s-result-item').forEach((item) => {
      // Get the title from the item
      const title = item.querySelector('h2 a span')?.textContent?.trim() || '';

      // Get the rating from the item
      // Rating is usually displayed as "4.5 out of 5 stars"
      const rating =
        item.querySelector('.a-icon-star-small .a-icon-alt')?.textContent?.trim() ||
        item.querySelector('.a-icon-alt')?.textContent?.trim() ||
        'No ratings yet';

      // Get the number of reviews from the item
      // Selector may vary based on the layout A/B
      const reviewsEl =
        item.querySelector('.a-size-base.s-underline-text') ||
        item.querySelector('[aria-label*="ratings"]') ||
        item.querySelector('[aria-label*="rating"]');
      const reviews = reviewsEl?.textContent?.trim() || 'No reviews yet';

      // Get the image URL from the item
      const image = (item.querySelector('img') as HTMLImageElement | null)?.src || '';

      // Only add the result if both the title and image are present
      if (title && image) {
        results.push({ title, rating, reviews, image });
      }
    });

    return results;
  } catch (error) {
    // Log the error message if an error occurs
    console.error('Service parsing error:', (error as Error).message);
    return null;
  }
};
