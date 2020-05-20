import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Saves a URL Redirection
 * @memberof AgilityManagement.Client.UrlRedirections
 * @param {Object} requestParams - The paramaters for the API request.

 * @param {String} requestParams.originUrl - The originUrl of the redirection.
 * @param {String} requestParams.destinationUrl - The destinationUrl of the redirection.
 * @param {Number} [requestParams.httpStatusCode] - The status code of the redirection (301 or 302) - defaults to 301
 * @returns {Promise<number>} - Returns the urlRedirectionID.
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
 * api.saveUrlRedirection({
 *  originUrl: "/from/link",
 *  destinationUrl: "/to/link"
 * })
 * .then(function(urlRedirectionID) {
 * 	 console.log("saved ", urlRedirectionID);
 * })
 * .catch(function(error) {
 *  #handle error
 * });
 *
 *
*/

function saveUrlRedirection(requestParams) {

	validateRequestParams(requestParams);

	if (! requestParams.httpStatusCode) requestParams.httpStatusCode = 301;

	const args = {
		"originUrl": requestParams.originUrl,
		"destinationUrl": requestParams.destinationUrl,
		"httpStatusCode": requestParams.httpStatusCode
	}

	const methodName = "SaveUrlRedirection";

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
    if(!requestParams.originUrl) {
		throw new TypeError('You must include an originUrl in your request params.')
	} else if(!requestParams.destinationUrl) {
		throw new TypeError('You must include a destinationUrl object in your request params.');
	} else if(requestParams.httpStatusCode) {

		if (requestParams.httpStatusCode != 301 && requestParams.httpStatusCode != 302) {
			throw new TypeError('The httpStatusCode must be 301 or 302.');
		}

    } else {
        return;
    }
}

export default saveUrlRedirection;