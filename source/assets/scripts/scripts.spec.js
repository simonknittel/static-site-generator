import {testDummy} from './scripts';

describe('A test dummy', () => {
    it('should return "It works!"', () => {
        expect(testDummy()).toEqual('It works!');
    });
});
