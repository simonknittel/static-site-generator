import helloWorld from './hello-world';

describe('Sample module/test', () => {
    it('should return "Hello World!"', () => {
        expect(helloWorld('World')).toEqual('Hello World!');
    });
});
