document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<p>Buscando...</p>';

  try {
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`,
    );
    const data = await response.json();

    if (!data.length) {
      resultsDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }

    resultsDiv.innerHTML = data
      .map(
        (product) => `
      <div class="product">
        <img src="${product.image}" alt="${product.title}">
        <div>
          <h3>${product.title}</h3>
          <p>⭐ ${product.rating || 'Sem avaliação'} (${
          product.reviews || '0'
        } avaliações)</p>
        </div>
      </div>
    `,
      )
      .join('');
  } catch (error) {
    resultsDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
});
