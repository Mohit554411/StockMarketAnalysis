const detailSection = document.getElementById('stockDetails');

export function renderStockDetails(stockData) {
    
    detailSection.innerHTML = `
        <h2>Stock Name: ${stockData.name}</h2>
        <p>Book Value: ${stockData.bookValue}</p>
        <p style="color: ${stockData.profit >= 0 ? 'green' : 'red'};">Profit: ${stockData.profit}</p>
        <p style="text-align:justify;padding-right:20px">${stockData.summary}</p>
    `;
    console.log('Stock details:', stockData);
}


