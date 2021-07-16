import axios from 'axios';

const mockData = [
  {
    symbol: 'WBA',
    expireDate: '2021-07-16T00:00',
    strike: 55.0,
    optionType: 'C',
    entryPremium: .5,
    entryDelta: .21,
    costBasis: 54.86
  },
  {
    symbol: 'TGT',
    expireDate: '2021-07-16T00:00',
    strike: 252.50,
    optionType: 'C',
    entryPremium: .56,
    entryDelta: .11,
    costBasis: 67.76
  },
  {
    symbol: 'CVX',
    expireDate: '2021-07-16T00:00',
    strike: 112.0,
    optionType: 'C',
    entryPremium: .26,
    entryDelta: .09,
    costBasis: 89.4
  },
  {
    symbol: 'SJM'
  },
  {
    symbol: 'CSCO'
  },
  {
    symbol: 'SBUX'
  },
  {
    symbol: 'AAPL'
  },
  {
    symbol: 'KMI'
  },
  {
    symbol: 'VZ'
  },
  {
    symbol: 'MDT'
  },
  {
    symbol: 'PG'
  },
  {
    symbol: 'ED'
  }, 
  {
    symbol: 'QCOM'
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
    const quoteMap = quotes.reduce((map, quote) => ({
      ...map,
      [quote.symbol]: quote
    }), {});
    const positionsAndQuotes = positions.map(p => ({
      ...p,
      quote: quoteMap[p.symbol]
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