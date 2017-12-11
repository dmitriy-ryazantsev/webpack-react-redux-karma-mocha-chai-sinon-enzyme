describe('Actions', () =>
{
    describe('authorization', () =>
    {
        require('./authorization/fetchToken').doTests();
        require('./authorization/logout').doTests();
    });

    describe('log', () =>
    {
        require('./log/addLogEntry').doTests();
        require('./log/hideLogEntry').doTests();
    });
});
