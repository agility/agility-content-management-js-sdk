/**
 * Agility Management API JS SDK for retrieving content from the Agility CMS
 * @namespace AgilityManagement
 */

/**
 * Agility Management API JS SDK client for Agility CMS
 * @namespace AgilityManagement.Client
 */


/**
* Agility Management API JS SDK for retrieving content from the Agility CMS
* @namespace AgilityManagement.Client.Content
*/

/**
* Agility Management API JS SDK for retrieving pages from the Agility CMS
* @namespace AgilityManagement.Client.Pages
*/

/**
* Agility Management API JS SDK for retrieving media from the Agility CMS
* @namespace AgilityManagement.Client.Media
*/



/**
 * Types returned by the the Management API
 * @namespace AgilityManagement.Types
 */


import createClient from './api-client'
import { isHttps } from './utils'

/**
 * How to create an instance of an an API client for the Agility Content Management REST API.
 * @func
 * @name getApi
 * @memberof AgilityManagement
 * @param {Object} config - API intialization params.
 *
 * @param {string} config.location - The geo-location of the API you wish to connect to (*USA/Canada).
 * @param {string} config.websiteName - The Website Name that identifies your Agility Instance [Settings | Global Security].
 * @param {string} config.securityKey - The Security Key used to authenticate your API requests [Settings | Global Security].
 *
 * @param {string} config.guid - [not yet in use] The guid that represents your instance.
 * @param {string} config.apiKey - [not yet in use] The secret token that represents your application.
 *
 * @param {string} [config.baseURL] - Optionally override the default Management API Base Url.
 *
 * @param {boolean} [config.debug] - Optionally turn on debug mode
 * @return {AgilityManagement.Client}
 * @example
 *
 * import agilityMgmt from '@agility/content-management'
 *
 * const mgmtApi = agilityMgmt.getApi({
 *   location: 'USA',
 *   websiteName: 'MyWebsiteName',
 *   securityKey: 'xyz123'
 * });
 */



function getApi(config) {
	validateConfigParams(config);
	return createClient(config);
}

function validateConfigParams(configParams) {

	//ensure a guid or a website name
	if ((!configParams.guid || configParams.guid.length == 0)
		&& (!configParams.websiteName || configParams.websiteName.length == 0)) {
		throw new TypeError('You must provide either guid or a websiteName.');
	}

	if (!configParams.guid || configParams.guid.length == 0) {
		//they are using security key...
		if (!configParams.securityKey || configParams.securityKey.length == 0) {
			throw new TypeError('You must provide a securityKey.');
		}
	} else {
		//they are using guid/apikey
		if (!configParams.apiKey || configParams.apiKey.length == 0) {
			throw new TypeError('You must provide an access token.');
		}
	}

	//check baseURL is https
	if (configParams.baseURL && !isHttps(configParams.baseURL)) {
		throw new TypeError(`When specifying a baseURL (${configParams.baseURL}), it must be over HTTPs.`);
	}

}


export default {
	getApi
};