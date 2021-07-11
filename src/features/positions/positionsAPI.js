import axios from 'axios';

const mockData = [
  {
    symbol: 'MSFT',
    displayName: "Microsoft",
    // earningsTimestamp: 1619539681,
    regularMarketPrice: 270.9,
  },
  {
    symbol: 'SBUX',
    displayName: "Starbucks",
    // earningsTimestamp: 1619539681,
    regularMarketPrice: 270.9,
  },
  {
    symbol: 'TGT'
  },
  {
    symbol: 'CVX'
  },
  {
    symbol: 'TGT210716C00252500'
  }
];

export async function fetchPositions() {
  try {
    const symbols = mockData.map(d => d.symbol);
    const quotes = await fetchQuotes(symbols);
    return {
      data: quotes
    };
  } catch(ex) {
    console.log(ex);
  }
}

export function fetchQuotes(symbols) {
  const url = "/api/getQuotes?symbols=" + symbols.join(",");
  return axios.get(url)
    .then(resp => {
      return resp?.data?.quoteResponse?.result;
    })
    .catch(ex => {
      console.log(ex);
    });
}