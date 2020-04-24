import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Get the ID of a media object in the instance based on it's path.
 * @memberof AgilityManagement.Client.Media
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {string} requestParams.path - The file path of the item.

 * @returns {Promise<number>} - Returns the media.
 * @example
 *
 * //TODO: add code example...
 *
*/
function requestApproval(requestParams) {

	validateRequestParams(requestParams);

	const args = {
		"originKey": requestParams.path
	}

	const methodName = "GetMediaID";

    const req = {
        url: buildAPIUrl({methodName, args}),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: buildAuthHeader({config:this.config, methodName, args}),
        data: ""
    };

    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if(!requestParams.path) {
		throw new TypeError('You must include a path in your request params.')
	} else {
        return;
    }
}


export default requestApproval;