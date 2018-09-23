const server = new require('./app')
console.log(server)

test('responds to API request', () => {
    expect(sum(1, 2)).toBe(3);
});