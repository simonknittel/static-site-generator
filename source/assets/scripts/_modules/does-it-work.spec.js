import doesItWork from './does-it-work';

describe('Checks the sample module', () => {
    it('should return true', () => {
        expect(doesItWork()).toEqual(true);
    });

    it('should return false', () => {
        expect(doesItWork(true)).toEqual(false);
    });
});
