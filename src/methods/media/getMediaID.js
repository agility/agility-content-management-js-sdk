import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Get the ID of a media object in the instance based on it's path.
 * @memberof AgilityManagement.Client.Media
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {string} requestParams.path - The file path of the item.

 * @returns {Promise<AgilityManagement.Types.MediaReturn>} - Returns the media.
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
 * 
 * #Set the path to the media
 * #Important: The path is the file name in Agility Media you need to access
 * let path = "test.png"
 * 
 * api.getMediaID({
 *  path
 * })
 * .then(function(mediaObj) {
 *  #check if media is not null/empty and has valid url for success
 * })
 * .catch(function(error) {
 *  #handle error
 * });
 * 
*/
function getMediaID(requestParams) {

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


export default getMediaID;