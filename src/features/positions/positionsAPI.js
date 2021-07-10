import axios from 'axios';

const mockData = [
  {
    symbol: 'MSFT',
    displayName: "Microsoft",
    earningsTimestamp: 1619539681,
    regularMarketPrice: 270.9,
  },
  {
    symbol: 'SBUX',
    displayName: "Starbucks",
    earningsTimestamp: 1619539681,
    regularMarketPrice: 270.9,
  }
];

// A mock function to mimic making an async request for data
export function fetchPositions() {
  console.log('fetchPositions');
  const symbols = mockData.map(d => d.symbol);
  console.log(symbols);
  return fetchQuotes(symbols)
    .then(resp => {
      console.log(resp);
      return new Promise((resolve) =>
        setTimeout(() => resolve({ data: mockData }), 500)
      );  
    });
}

export function fetchQuotes(symbols) {
  const url = "https://query2.finance.yahoo.com/v7/finance/quote?symbols=" + symbols.join(",");
console.log(url);
  return axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*"      
    }
  })
    .then(resp => {
      console.log(resp);
    })
    .catch(ex => {
      console.log(ex);
    });
}