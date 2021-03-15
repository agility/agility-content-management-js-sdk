import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Saves a WebHook
 * @memberof AgilityManagement.Client.WebHooks
 * @param {Object} requestParams - The paramaters for the API request.

 * @param {String} requestParams.name - The name of the webhook.
 * @param {String} requestParams.url - The url of the webhook.
 * @param {boolean} requestParams.publishEvents - Whether to receive publish events or not.
 * @param {boolean} requestParams.saveEvents - Whether to receive save events or not.
 * @param {boolean} requestParams.workflowEvents - Whether to receive workflow events or not (such as approve, decline, etc).

 * @returns {Promise} - No return value.
*/

function saveWebHook(requestParams) {

	validateRequestParams(requestParams);

	if (! requestParams.httpStatusCode) requestParams.httpStatusCode = 301;

	const args = {
		"name": requestParams.name,
		"url": requestParams.url,
		"publishEvents": requestParams.publishEvents === true ? true : false,
		"saveEvents": requestParams.saveEvents === true ? true : false,
		"workflowEvents": requestParams.workflowEvents === true ? true : false
	}

	const methodName = "SaveWebHook";

	const data = '';

    const req = {
        url: buildAPIUrl({methodName, args}),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: { ... buildAuthHeader({config:this.config, methodName, args})},
        data: data
    };

    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if(!requestParams.url) {
		throw new TypeError('You must include a url in your request params.')
	} else if(!requestParams.saveEvents && !requestParams.publishEvents && !requestParams.workflowEvents) {
		throw new TypeError('One of saveEvents, publishEvents, or workflowEvents must be true.');
    } else {
        return;
    }
}

export default saveWebHook;