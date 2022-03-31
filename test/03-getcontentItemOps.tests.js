import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import fs from 'fs'

import { createApiClientDev } from './apiClients.config'

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

const ref = {
	publishedContentItemID: 15,
	updatesMadeToPublishedContentItemID: 15
}

describe('contentItem Operations:', function () {

	this.timeout('120s');

	let contentIDToWorkOn = 16;



	//GET THE ITEM
	it('should get the content item that was just saved', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.getContentItem({
			contentID,
			languageCode
		})
			.then(function (itemWeGot) {
				console.log({itemWeGot})
				assert.isNotNull(itemWeGot, "the content item was not returned")
				assert.isTrue(contentID === itemWeGot.contentID, "the contentID that was returned was not greater than 0");
				done();
			})
			.catch(done);
	})



});

