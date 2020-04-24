import FormData from 'form-data'
import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Saves a content item.
 * @memberof AgilityManagement.Client.Content
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {AgilityManagement.Types.ContentItem} requestParams.contentItem - The contentItem to be saved.
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

	const {fields, attachments} = pulloutAttachments(requestParams.contentItem);

	let encodedContentItem = JSON.stringify(fields)
	let attachmentsEncoded = JSON.stringify(attachments);

	const form = new FormData()
	form.append("contentItem", encodedContentItem);
	form.append("attachments", attachmentsEncoded);

    const req = {
        url: buildAPIUrl({methodName, args}),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: { ... buildAuthHeader({config:this.config, methodName, args}), ... form.getHeaders() },
        data: form
    };

    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if(!requestParams.languageCode) {
		throw new TypeError('You must include a languageCode in your request params.')
	} else if(!requestParams.contentItem) {
		throw new TypeError('You must include a contentItem object in your request params.');
	} else if(!requestParams.contentItem.contentID) {
		throw new TypeError('You must include a contentItem.contentID number in your request params.');
    } else {
        return;
    }
}

function pulloutAttachments(contentItem)
{

	let fields = {};
	let attachments= [];

	for (const fieldName in contentItem.fields) {
		if (contentItem.fields.hasOwnProperty(fieldName)) {
			const value = contentItem.fields[fieldName];

			if (value.mediaID !== undefined || value.clearAttachment !== undefined) {

				//this is an attachment...
				attachments.push({
					managerID: fieldName,
					AssetMediaID: value.mediaID,
					clearAttachment: value.clearAttachment,
					label: value.label
				});

			} else {
				//regular field...
				fields[fieldName] = value;

			}

		}
	}

	return {fields, attachments };

}


export default saveContentItem;