import axios from 'axios';

const mockData = [
  {
    symbol: 'WBA',
    sharesOwned: 300,
    costBasis: 55.3,
    expireDate: '2021-07-16T00:00',
    strike: 55.0,
    optionType: 'C',
    entryPremium: .5,
    entryDelta: .21,
  },
  {
    symbol: 'TGT',
    sharesOwned: 117,
    costBasis: 67.76,
    expireDate: '2021-07-16T00:00',
    strike: 252.50,
    optionType: 'C',
    entryPremium: .56,
    entryDelta: .11,
  },
  {
    symbol: 'CVX',
    sharesOwned: 104,
    costBasis: 89.4,
    expireDate: '2021-07-16T00:00',
    strike: 112.0,
    optionType: 'C',
    entryPremium: .26,
    entryDelta: .09,
  },
  {
    symbol: 'MSFT',
    sharesOwned: 83.01,
    costBasis: 27.19,
  },
  {
    symbol: 'SJM',
    sharesOwned: 115,
    costBasis: 113.9,
  },
  {
    symbol: 'CSCO',
    sharesOwned: 400,
    costBasis: 23.54,
  },
  {
    symbol: 'SBUX',
    sharesOwned: 215,
    costBasis: 55.5,
  },
  {
    symbol: 'AAPL',
    sharesOwned: 200,
    costBasis: 21.2,
  },
  {
    symbol: 'KMI',
    sharesOwned: 659,
    costBasis: 22.34,
  },
  {
    symbol: 'VZ',
    sharesOwned: 423,
    costBasis: 55.02,
  },
  {
    symbol: 'MDT',
    sharesOwned: 160,
    costBasis: 74.77,
  },
  {
    symbol: 'PG',
    sharesOwned: 145,
    costBasis: 76.59,
  },
  {
    symbol: 'ED',
    sharesOwned: 200,
    costBasis: 70.29,
  }, 
  {
    symbol: 'QCOM',
    sharesOwned: 120,
    costBasis: 54.83,
  }
  // {
  //   symbol: 'TGT210716C00252500'
  // }
];

export async function fetchPositions() {
  try {
    const positions = mockData;
    const symbols = mockData.map(d => d.symbol);
    const quotes = await fetchQuotes(symbols);
    const tickers = await fetchTickers(symbols);
    const quoteMap = quotes.reduce((map, quote) => ({
      ...map,
      [quote.symbol]: quote
    }), {});
    const tickerMap = tickers.reduce((map, ticker) => ({
      ...map,
      [ticker.symbol]: ticker
    }), {});
    const positionsAndQuotes = positions.map(p => ({
      ...p,
      quote: quoteMap[p.symbol],
      ticker: tickerMap[p.symbol]
    }));

    return {
      data: positionsAndQuotes
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

export function fetchTickers(symbols) {
  const url = "/api/getTickers?symbols=" + symbols.join(",");
  return axios.get(url)
    .then(resp => {
      return resp?.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
