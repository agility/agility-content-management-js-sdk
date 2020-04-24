import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import agility from '../src/content-management'


//This is a synchronous test
describe('getApi:', function() {

    this.timeout('120s');

    it('should return an api client object with required params', function(done) {
        const api = agility.getApi({
            websiteName: 'my website',
            securityKey: 'some-security-key'
        });
        assert.strictEqual(typeof(api), "object", "The api object should be an object type.");
        assert.isTrue(api.config != null, "The api.config should not be null" );
        done();
    })

    //TODO: add more tests here..

});
