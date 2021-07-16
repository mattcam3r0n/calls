const axios = require('axios');
const yahooFinance = require('yahoo-finance');

module.exports = async function (context, req) {

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const symbols = req.query.symbols;
    context.log('getQuotes api called: symbols = ' + symbols);

    const url = "https://query2.finance.yahoo.com/v7/finance/quote?symbols=" + symbols;

    const response = await axios.get(url);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response.data
    };
    context.done();
}