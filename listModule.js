import {renderStockDetails} from './detailsModule.js';
import {changeStockName} from './chartModule.js';
// listModule.js
const allStocks =  ['AAPL','MSFT','GOOGL' ,'AMZN','PYPL', 'TSLA','JPM','NVDA', 'NFLX', 'DIS'];
let stockList = []
// listModule.js
const stockListEle = document.getElementById('stockList');


    renderStockList(),
    setupListClickEvents()


// fetch all stocks from the API
async function fetchStocks() {
    return await fetch('https://stocks3.onrender.com/api/stocks/getstockstatsdata').then(res => res.json());
}

// Function to render the list of stocks
 async function renderStockList() {
    // Loop through the Stocks array and create list items with onclick events
    stockList = await fetchStocks();
    allStocks.forEach(stock => {
        const listItem = document.createElement('li');
        const divConatiner = document.createElement('div');
        divConatiner.className = 'stockDetails';
        const stockName = document.createElement('div');
        stockName.className = 'stockName';
        stockName.innerText = stock;
        const stockPrice = document.createElement('div');
        stockPrice.className = 'stockPrice';
        stockPrice.innerText = `$${stockList.stocksStatsData[0][stock].bookValue.toFixed(2)}`;
        const stockChange = document.createElement('div');
        stockChange.className = 'stockChange';
        const change = stockList.stocksStatsData[0][stock].profit > 0 ? '+' : '-';
        stockChange.innerText = `${change}${stockList.stocksStatsData[0][stock].profit.toFixed(2)}%`;
        stockChange.style.color = stockList.stocksStatsData[0][stock].profit > 0 ? 'green' : 'red';
        divConatiner.appendChild(stockName);
        divConatiner.appendChild(stockPrice);
        divConatiner.appendChild(stockChange);
        listItem.appendChild(divConatiner);
        stockListEle.appendChild(listItem);
    });
    handleListItemClick(allStocks[0]);
}

// Function to handle list item click events
function setupListClickEvents() {
    stockListEle.addEventListener('click', (event) => {
        console.log(event)
        const clickedElement = event.target.closest('.stockName');
        if (clickedElement) {
            const selectedStock = clickedElement.innerText;
            handleListItemClick(selectedStock);
        }
    });
}

// Function to handle individual list item click events
async function handleListItemClick(stock) {
    // Call API: https://stocks3.onrender.com/api/stocks/getstocksprofiledata
    // Update chart and detail sections based on the selected stock
    const stockProfile = await fetch(`https://stocks3.onrender.com/api/stocks/getstocksprofiledata?stock=${stock}`).then(res => res.json());

    // console.log('Clicked on stock:', stock);

    // console.log('Stock profile:', stockProfile.stocksProfileData[0][stock].summary);

    const stockData = {
        name: stock,
        bookValue: stockList.stocksStatsData[0][stock].bookValue,
        profit: stockList.stocksStatsData[0][stock].profit,
        summary: stockProfile.stocksProfileData[0][stock].summary
    };
    changeStockName(stock);
    renderStockDetails(stockData);
}




