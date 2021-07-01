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
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: mockData }), 500)
  );
}
