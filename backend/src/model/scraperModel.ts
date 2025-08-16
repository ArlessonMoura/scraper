import axios, { AxiosError } from 'axios';

/**
 * Fetches HTML content from a URL using a custom User-Agent.
 *
 * @param url - The URL to be requested.
 * @returns The page's HTML or null if an error occurs.
 */
export const getScraperData = async (url: string): Promise<string | null> => {
  try {
    // Send GET request to the specified URL with custom headers
    const { data } = await axios.get<string>(url, {
      headers: {
        // Headers for a custom User-Agent and improves caching
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
      // Set timeout for the request
      timeout: 10000,

      maxRedirects: 5,
      // Only accept responses with status codes in the 2xx range
      validateStatus: (status) => status >= 200 && status < 400,
    });

    return data;
  } catch (error) {
    // If an error occurs, log the error message and return null
    const axiosError = error as AxiosError;
    console.error(`Error accessing ${url}:`, axiosError.message);
    return null;
  }
};
