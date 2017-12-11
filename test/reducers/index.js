describe('Reducers', () =>
{
    let imports =
    [
        require('./userIdentity'),
    ]
    .forEach((testBundle) =>
    {
        testBundle.doTests();
    });
});
