module.exports = async function (context, req) {
    context.log('getTickers called');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: context.bindings.tickers
    };
}