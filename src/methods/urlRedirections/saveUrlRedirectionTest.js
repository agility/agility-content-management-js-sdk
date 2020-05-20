import FormData from 'form-data'
import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Saves a URL Redirection Test
 * @memberof AgilityManagement.Client.UrlRedirections
 * @param {Object} requestParams - The paramaters for the API request.

 * @param {Number} requestParams.urlRedirectionID - The id of the redirection.
 * @param {Boolean} requestParams.passed - Whether the test passed or not
 * @param {String} requestParams.testResult - A string representing the test result in human readable form.
 * @returns {Promise} - No return value.
 * @example
 *
 * import agilityMgmt from '@agility/content-management'
 *
 * #Create a new instance API client
 * const api = agilityMgmt.getApi({
 *   location: 'MyLocation',
 *   websiteName: 'MyWebsiteName',
 *   securityKey: 'MySecurityKey'
 * });
 *
 * api.saveUrlRedirectionTest({
 *  urlRedirectionID: urlRedirectionIDtoUpdate,
 *  passed: true,
 *  testResult: "- 301 to /dest-url"
 * })
 * .then(function() {
 * 	 console.log("updated test");
 * })
 * .catch(function(error) {
 *  #handle error
 * });
 *
 *
*/

function saveUrlRedirectionTest(requestParams) {

	validateRequestParams(requestParams);

	let testStatus = 1; //fail
	if (requestParams.passed === true) testStatus = 2;

	const args = {
		"urlRedirectionID": requestParams.urlRedirectionID
	}

	const methodName = "SaveUrlRedirectionTest";

	const form = new FormData()
	form.append("testResult", requestParams.testResult);
	form.append("testStatus", testStatus)


	const req = {
		url: buildAPIUrl({ methodName, args }),
		method: 'post',
		baseURL: this.config.baseURL,
		headers: { ... buildAuthHeader({config:this.config, methodName, args}), ... form.getHeaders() },
		data: form
	};

	return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
	if (!requestParams.urlRedirectionID) {
		throw new TypeError('You must include a urlRedirectionID in your request params.')
	} else if (requestParams.urlRedirectionID < 1) {
		throw new TypeError('You must include a urlRedirectionID greater than 0 in your request params.')
	} else if (! requestParams.testResult) {
		throw new TypeError('You must include a testResult string in your request params.')
	} else if (! (requestParams.passed === true || requestParams.passed === false)) {
		throw new TypeError('You must include a true or false value for passed in your request params.')
	} else {
		return;
	}
}

export default saveUrlRedirectionTest;