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
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        Referer: 'https://www.google.com/',
        DNT: '1',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      // Set timeout for the request
      timeout: 10000,

      maxRedirects: 5,
      validateStatus: () => true,
    });

    return data;
  } catch (error) {
    // If an error occurs, log the error message and return null
    const axiosError = error as AxiosError;
    console.error(`Error accessing ${url}:`, axiosError.message);
    return null;
  }
};
