const yahooFinance = require('yahoo-finance');

module.exports = async function (context, req) {
    context.log('updateTicker called');

    const symbol = req.query.symbol;
    const result = await yahooFinance.quote({
        symbol: symbol,
        modules: ['price', 'summaryDetail', 'calendarEvents']
    });

    const ticker = {
        id: symbol,
        symbol,
        ...result.summaryDetail,
        ...result.price,
        dividendDate: result.calendarEvents.dividendDate,
        earningsDate: new Date(result.calendarEvents.earnings.earningsDate[0] * 1000).toISOString(),
        updatedDate: new Date().toISOString()
    };

    context.bindings.ticker = JSON.stringify(ticker);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: ticker
    };
    context.done();
}