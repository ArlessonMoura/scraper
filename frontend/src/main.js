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
 * Fetches and displays scraped Amazon products based on user input.
 */
document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value; // Get the user input
  const resultsDiv = document.getElementById('results'); // Get the results container

  // Check if the keyword is empty
  if (!keyword.trim()) {
    resultsDiv.innerHTML = '<p style="color:red;">You must enter a keyword.</p>'; // Display error message
    return;
  }

  resultsDiv.innerHTML = '<p>Loading...</p>'; // Display loading message

  try {
    // Fetch scraped products from the API
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`,
    );
    const data = await response.json(); // Parse the response as JSON

    if (!data.length) {
      resultsDiv.innerHTML = '<p>No products found.</p>'; // Display message if no products found
      return;
    }

    // Generate HTML for each product and join them
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
    resultsDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`; // Display error message
  }
});
