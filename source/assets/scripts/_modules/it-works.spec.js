import {doesItWork} from './it-works';

describe('Sample module/test', () => {
    it('should return "It works!"', () => {
        expect(doesItWork()).toEqual('It works!');
    });
});
