import doesItWork from './does-it-work';

describe('The sample module', () => {
    test('should return true', () => {
        expect(doesItWork()).toBe(true);
    });
});
