import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Get the ID of a media object in the instance based on it's path.
 * @memberof AgilityManagement.Client.Content
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {number} requestParams.contentID - The contentID of the item.
 * @param {string} requestParams.languageCode - The languageCode of the item.

 * @returns {Promise<AgilityManagement.Types.ContentItem>} - Returns the media.
 *
*/
function getContentItem(requestParams) {

    validateRequestParams(requestParams);

    const args = {
        "contentID": requestParams.contentID,
        "languageCode": requestParams.languageCode,
    }

    const methodName = "GetContentItem";

    const req = {
        url: buildAPIUrl({ methodName, args }),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: buildAuthHeader({ config: this.config, methodName, args }),
        data: ""
    };
    const self = this
    let promise = new Promise(function (resolve, reject) {

        self.makeRequest(req)
            .then((response) => {
                if (!response) {
                    resolve(null)
                    return
                }

                let contentItem = {
                    contentID: response.ContentID,
                    properties: {
                        versionID: response.VersionID,
                        locale: response.LanguageCode,
                        modifiedOn: response.ModifiedOn,
                        state: response.State,
                        modifiedBy: response.ModifiedBy
                    },
                    fields: {}
                }
                const reserved = [
                    "ContentID",
                    "VersionID",
                    "LanguageCode",
                    "ModifiedOn",
                    "State",
                    "ModifiedBy",
                    "PublishedDate",
                    "PublishedAuthor"]

                for (let key in response) {
                    if (reserved.includes(key)) continue
                    contentItem.fields[key] = response[key]
                }

                resolve(contentItem);
            })
            .catch((error) => {
                reject(error)
            });

    });

    return promise


}

function validateRequestParams(requestParams) {
    if (!(requestParams.contentID > 0)) {
        throw new TypeError('You must include a contentID in your request params that is greater than zero.')
    } else if (!requestParams.languageCode) {
        throw new TypeError('You must include a languageCode in your request params.')
    } else {
        return;
    }
}


export default getContentItem;