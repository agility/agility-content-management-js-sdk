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

describe('media Operations:', function () {

	this.timeout('120s');

	let mediaRetObj = null;
	let path = null;

	//UPLOAD
	it('should upload a media file', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		//upload a file from this project...
		let blob = fs.createReadStream('./test/sample/logo.png')
		let filename = `test-${new Date().toISOString().replace(/\./g, "").replace(/:/g, "")}.png`;
		path = filename;

		api.uploadMedia({
			fileName: filename,
			fileContent: blob
		})
		.then(function (mediaObj) {

			mediaRetObj = mediaObj;

			assert.isTrue(mediaObj !== null, "the media object that was returned was null");
			assert.isTrue(mediaObj.url !== null, "the media url returned was null")
			assert.isTrue(mediaObj.size > 0, "the file size returned was not > 0")

			done();
		})
		.catch(done);
	})

	//GET ID
	it('should get a media ID', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		api.getMediaID({
			path: path
		})
		.then(function (mediaID) {
			assert.isTrue(mediaID > 0, "the media id that was returned was not greater than 0");
			done();
		})
		.catch(done);
	})



});

