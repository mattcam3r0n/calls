const axios = require('axios');

module.exports = async function (context, req) {
    context.log('updateTickers called.');

    // filter to those needing update? or just do all?
    const tickersToUpdate = context.bindings.tickers;

    tickersToUpdate.forEach(t => {
        context.log('updating ' + t.symbol);
        axios.get('/api/updateTicker?symbol=' + t.symbol)
            .catch(ex => {
                context.log(ex);
            });
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        // body: responseMessage
    };
    context.done();
}