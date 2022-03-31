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

	let contentIDToWorkOn = -1;

	let mediaRetObj = null;
	let path = null;
	let savedTitleValue = null

	//UPLOAD a file to use for an attachment
	it('should upload a media file to use for an attachment', (done) => {
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

	//SAVE
	it('should save a new content item the Posts shared content list ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		savedTitleValue = `Test item ${new Date().toLocaleString()}`

		let contentItem = {
			contentID: -1,
			fields: {
				"Title": `Test item ${new Date().toLocaleString()}`,
				"Details": `Test details ${new Date().toLocaleString()}`,
				"Image": {
					"mediaID": mediaRetObj.mediaID,
					"label": "Test Image"
				}
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

			  contentIDToWorkOn = contentID;
		    done();
		  })
		 .catch(done);
	})

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

				assert.isNotNull(itemWeGot, "the content item was not returned");
				assert.isTrue(contentID === itemWeGot.contentID, "the contentID that was returned was not greater than 0");
				assert.isTrue(savedTitleValue === itemWeGot.fields.Title);
				done();
			})
			.catch(done);
	})

	//REQUEST APPROVAL
	it('should request approval for a content item ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.requestApproval({
			contentID,
			languageCode
		})
			.then(function (contentID) {
				assert.isTrue(contentID > 0, "the contentID that was returned was not greater than 0");
				done();
			})
			.catch(done);
	})

	//DECLINE
	it('should decline a content item ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.declineContent({
			contentID,
			languageCode
		})
			.then(function (contentID) {
				assert.isTrue(contentID > 0, "the contentID that was returned was not greater than 0");
				done();
			})
			.catch(done);
	})

	//APPROVE
	it('should approve a content item ', (done) => {

		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.approveContent({
			contentID,
			languageCode
		})
		.then(function (contentID) {
			assert.isTrue(contentID > 0, "the contentID that was returned was not greater than 0");
			done();
		})
		.catch(done);
	})

	//PUBLISH
	it('should publish a content item ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.publishContent({
			contentID,
			languageCode
		})
		.then(function () {

			done();
		})
		.catch(done);
	})

	//UNPUBLISH
	it('should unpublish a content item ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.unpublishContent({
			contentID,
			languageCode
		})
		.then(function () {

			done();
		})
		.catch(done);
	})


	//DELETE
	it('should delete a content item ', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		let contentID = contentIDToWorkOn;
		let languageCode = "en-us";

		api.deleteContent({
			contentID,
			languageCode
		})
		.then(function () {

			done();
		})
		.catch(done);
	})


});

