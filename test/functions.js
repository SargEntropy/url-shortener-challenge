var assert = require('assert');
const url = require('../app/url/url');

var ur = "https://www.careercup.com/question?id=5185808560553984";
describe('app functions', function() {
    describe('generateHash', function() {
        it('should return a hash key', function() {
            assert.equal(url.generateHash(ur), "ODZkOWRjO");
        });
    });
});
