import assert = require('assert');

describe('Array', () => {
    describe('#IndexOf()', () => {
        it('Should return -1 when the value is not present', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('Should return 3 when the value exists', () => {
            assert.equal([1, 2, 3, 4].indexOf(4), 3);
        });
    });
});