import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Deletes a WebHook
 * @memberof AgilityManagement.Client.WebHooks
 * @param {Object} requestParams - The paramaters for the API request.

 * @param {String} requestParams.url - The url of the WebHook to delete.
 * @returns {Promise} - No return value.
 *
*/

function deleteWebHook(requestParams) {

	validateRequestParams(requestParams);

	const args = {
		"url": requestParams.url
	}

	const methodName = "DeleteWebHook";

	const data = '';

	const req = {
		url: buildAPIUrl({ methodName, args }),
		method: 'post',
		baseURL: this.config.baseURL,
		headers: { ...buildAuthHeader({ config: this.config, methodName, args }) },
		data: data
	};

	return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
	if (!requestParams.url) {
		throw new TypeError('You must include a url in your request params.')
	} else {
		return;
	}
}

export default deleteWebHook;