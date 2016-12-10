import doesItWork from './does-it-work';

describe('The sample module', () => {
    it('should return true', () => {
        expect(doesItWork()).toEqual(true);
    });
});
