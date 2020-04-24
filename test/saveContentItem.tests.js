import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import { createApiClientDev } from './apiClients.config'

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

const ref = {
	publishedContentItemID: 15,
	updatesMadeToPublishedContentItemID: 15
}

describe('saveContentItem:', function () {

	this.timeout('120s');

	it('should save a new content item the Posts shared content list ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentItem = {
			contentID: -1,
			fields: {
				"Title": `Test item ${new Date().toLocaleString()}`,
				"Details": `Test details ${new Date().toLocaleString()}`,
			}
		};
		let languageCode = "en-us";
		let referenceName = "Posts";

		api.saveContentItem({
				contentItem,
				languageCode,
				referenceName
		  })
		 .then(function(contentID) {
		  	assert.isTrue(contentID > 0, "the contentID that was returned was not greater than 0");
		      done();
		  })
		 .catch(done);
	})


});

