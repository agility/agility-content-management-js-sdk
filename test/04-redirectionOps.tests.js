import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import fs from 'fs'

import { createApiClientDev } from './apiClients.config'

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


describe('urlRedirection Operations:', function () {

	this.timeout('120s');

	let urlRedirectionToWorkOn = -1;

	//SAVE A NEW REDIRECTION
	it('should save a new URL redirection', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		//create a new url redirection
		let originUrl = `~/test-${new Date().toISOString().replace(/\./g, "").replace(/:/g, "")}`;
		let destinationUrl = `~/test-${new Date().toISOString().replace(/\./g, "").replace(/:/g, "")}`;

		api.saveUrlRedirection({ originUrl, destinationUrl })
		.then(function (urlRedirectionID) {

			assert.isAbove(urlRedirectionID, 0, "the urlRedirectionID that was returned was not greater than 0");

			urlRedirectionToWorkOn = urlRedirectionID;

			done();
		})
		.catch(done);
	})


	it('should save a test result on the previously created URL redirection', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		//save a test result on the previously created redirection

		let passed = true
		let testResult = "301 -test passed ok!"

		api.saveUrlRedirectionTest({ urlRedirectionID: urlRedirectionToWorkOn, passed, testResult  })
		.then(function () {
			done();
		})
		.catch(done);
	})


	it('should delete the previously created URL redirection', (done) => {
		let api = createApiClientDev();

		assert.strictEqual(typeof (api), "object", "The api object should be an object type.");

		//delete the previously created redirection

		api.deleteUrlRedirection({ urlRedirectionID: urlRedirectionToWorkOn })
		.then(function () {
			done();
		})
		.catch(done);
	})
});

