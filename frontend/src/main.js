import './style.css';

// Select the element with the id 'app' and set its innerHTML to the
// template string below. This template creates a container div with
// a heading, an input field for the user to enter their search keyword,
// a button to trigger the scraping process, and a div to display the
// results of the scraping process.
document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Scraper Amazon</h1>
    <input id="keyword" type="text" placeholder="Enter your search" />
    <button id="scrapeBtn">SEARCH</button>
    <div id="results"></div>
  </div>
`;

/**
 * Event listener for the click event on the scrape button.
 * Triggers the scraping process when the button is clicked.
 */
document.getElementById('scrapeBtn').addEventListener('click', async () => {
  // Get the value entered by the user in the input field
  const keyword = document.getElementById('keyword').value;

  // Get the div element where the results will be displayed
  const resultsDiv = document.getElementById('results');

  // If the keyword is empty, display an error message and return
  if (!keyword.trim()) {
    resultsDiv.innerHTML = '<p style="color:red;">You must enter a keyword.</p>';
    return;
  }

  // Display a message indicating that the search is in progress
  resultsDiv.innerHTML = '<p style="color:blue;">Searching on Amazon...</p>';

  try {
    // Send a GET request to the API endpoint with the encoded keyword
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`,
    );

    // If the request fails, throw an error
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    // Parse the response data as JSON
    const data = await response.json();

    // If the response is not an array or the array is empty, display a message
    if (!Array.isArray(data) || !data.length) {
      resultsDiv.innerHTML = '<p>No products found.</p>';
      return;
    }

    // Display the scraped products
    resultsDiv.innerHTML = data
      .map(
        (product) => `
          <div class="product">
            <img src="${product.image}" alt="${product.title}">
            <div>
              <h3>${product.title}</h3>
              <p>⭐ ${product.rating || 'No rating yet'} (${
          product.reviews || '0'
        } reviews)</p>
            </div>
          </div>
        `,
      )
      .join('');
  } catch (error) {
    // Display an error message if an unexpected error occurs
    resultsDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
});
