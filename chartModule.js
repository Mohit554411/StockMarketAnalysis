// chartModule.js
const chartSection = document.getElementById('chart');
let allChartData = await fetchDataFromAPI()
let stockName = 'AAPL';
// Function to fetch and render chart based on selected time range
async function renderChart(timeRange,stockName) {
    // Fetch data from the API: https://stocks3.onrender.com/api/stocks/getstocksdata
    // const chartData = allChartData.stocksData[0]['AAPL']['5y']

    // Extract timestamps and values from the API response
    const timestamps = allChartData.stocksData[0][stockName][timeRange].timeStamp;
    const values = allChartData.stocksData[0][stockName][timeRange].value;

    // Create a Plotly chart
    const trace = {
        x: timestamps.map(timestamp => new Date(timestamp * 1000).toLocaleDateString()),
        y: values,
        type: 'line',
    };

    const layout = {
        title: `Stock Values Over Time (${timeRange})`,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Stock Value' },
    };

    const config = {
        responsive: true,
    };

    Plotly.newPlot(chartSection, [trace], layout, config);
}

// Function to fetch data from the API
async function fetchDataFromAPI() {
    const apiUrl = `https://stocks3.onrender.com/api/stocks/getstocksdata`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}
const timeStampsButton = document.getElementById('timeStamp');
// Create buttons for different time ranges
const timeRanges = ['1mo', '3mo', '1y', '5y'];
timeRanges.forEach(range => {
    const button = document.createElement('button');
    button.innerText = range;
    button.addEventListener('click', () => handleButtonClick(range));
    timeStampsButton.appendChild(button);
});

// Function to handle button click events
function handleButtonClick(range) {
    renderChart(range,stockName);
}

// Initial chart rendering
renderChart('1mo',stockName);

export function changeStockName(stock){
    stockName = stock;
    renderChart('1mo',stockName);
}