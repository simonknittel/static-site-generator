import {foo} from './scripts';

describe('foo', () => {
    it('should say boo', () => {
        expect(foo()).toEqual('boo');
    });
});
