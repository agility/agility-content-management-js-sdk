import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Gets the details of a content item by their Content ID.
 * @memberof AgilityManagement.Client.Content
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {AgilityFetch.Types.ContentItem} requestParams.contentItem - The contentItem to be saved.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @param {string} requestParams.referenceName - The referenceName of the list or single item that you are updating.

 * @returns {Promise<number>} - Returns the contentID.
 * @example
 *
 * //TODO: add code example...
 *
*/
function saveContentItem(requestParams) {

	validateRequestParams(requestParams);

	const args = {
		"contentID": requestParams.contentItem.contentID,
		"languageCode": requestParams.languageCode,
		"referenceName": requestParams.referenceName
	}

	const methodName = "SaveContentItem";

	let encodedContentItem = JSON.stringify(requestParams.contentItem.fields)
	let attachmentsEncoded = ""

	const data = `contentItem=${encodeURIComponent(encodedContentItem)}&attachments=${encodeURIComponent(attachmentsEncoded)}`

    const req = {
        url: buildAPIUrl({methodName, args}),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: buildAuthHeader({config:this.config, methodName, args}),
        data: data
    };

    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if(!requestParams.languageCode) {
		throw new TypeError('You must include a languageCode in your request params.')
	} else if(!requestParams.languageCode) {
			throw new TypeError('You must include a languageCode in your request params.')
    } else if(!requestParams.contentItem) {
		throw new TypeError('You must include a contentItem object in your request params.');
	} else if(!requestParams.contentItem.contentID) {
		throw new TypeError('You must include a contentItem.contentID number in your request params.');
    } else {
        return;
    }
}

export default saveContentItem;