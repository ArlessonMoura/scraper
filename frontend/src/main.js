import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Scraper Amazon</h1>
    <input id="keyword" type="text" placeholder="Enter your search" />
    <button id="scrapeBtn">SEARCH</button>
    <div id="results"></div>
  </div>
`;

document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value;
  const resultsDiv = document.getElementById('results');

  if (!keyword.trim()) {
    resultsDiv.innerHTML = '<p style="color:red;">You must enter a keyword.</p>';
    return;
  }

  resultsDiv.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`,
    );
    const data = await response.json();

    if (!data.length) {
      resultsDiv.innerHTML = '<p>No products found.</p>';
      return;
    }

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
    resultsDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
});
