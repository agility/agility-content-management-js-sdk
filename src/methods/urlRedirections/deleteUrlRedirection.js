import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Deletes a URL Redirection
 * @memberof AgilityManagement.Client.UrlRedirections
 * @param {Object} requestParams - The paramaters for the API request.

 * @param {Number} requestParams.urlRedirectionID - The id of the redirection to delete.
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
 * api.deleteUrlRedirection({
 *  urlRedirectionID: urlRedirectionIDToDelete
 * })
 * .then(function() {
 * 	 console.log("deleted");
 * })
 * .catch(function(error) {
 *  #handle error
 * });
 *
 *
*/

function deleteUrlRedirection(requestParams) {

	validateRequestParams(requestParams);

	const args = {
		"urlRedirectionID": requestParams.urlRedirectionID
	}

	const methodName = "DeleteUrlRedirection";

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
	if (!requestParams.urlRedirectionID) {
		throw new TypeError('You must include a urlRedirectionID in your request params.')
	} else if (requestParams.urlRedirectionID < 1) {
		throw new TypeError('You must include a urlRedirectionID greater than 0 in your request params.')
	} else {
		return;
	}
}

export default deleteUrlRedirection;