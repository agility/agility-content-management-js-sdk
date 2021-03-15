import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import fs from 'fs'

import { createApiClientDev } from './apiClients.config'

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


describe('webHook Operations:', function () {

	this.timeout('120s');

	let dateStrNow = new Date().toISOString().replace(/\./g, "").replace(/:/g, "")
	let urlToWorkOn = `http://test.url.com/${dateStrNow}`;
	let webhookCreated = false

	//SAVE A NEW WEBHOOK
	it('should save and delete a WebHook', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		//create a new webhook
		const name = `Test Webhook ${dateStrNow}`

		api.saveWebHook({ url:urlToWorkOn, name, publishEvents: false, saveEvents: true, workflowEvents: false })
		.then(function () {

			api.deleteWebHook({ url: urlToWorkOn })
			.then(function () {
				done();
			})
			.catch(done);

		})
		.catch(done);
	})

});

