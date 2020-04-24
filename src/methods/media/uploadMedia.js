import FormData from 'form-data'
import { buildAPIUrl, buildAuthHeader } from '../../utils'

/**
 * Uploads a file to the media repository.
 * @memberof AgilityManagement.Client.Media
 * @param {Object} requestParams - The paramaters for the API request.
 * @param {object} requestParams.fileContent - The contents of the file.
 * @param {string} requestParams.fileName - The name of the file.
 * @param {string} [requestParams.mediaFolder] - (Optional) The folder to upload the file to.
 *
 * @returns {Promise<AgilityManagement.Types.MediaReturn>} - Returns the mediaID.
 * @example
 *
 * //TODO: add code example...
 *
*/
function uploadMedia(requestParams) {

	validateRequestParams(requestParams);

	if (! requestParams.mediaFolder) requestParams.mediaFolder = ""

	const args = {
		"folder": requestParams.mediaFolder
	}

	const methodName = "UploadMedia";

	//prep the file upload...
	const form = new FormData()
	form.append("uploadedfile", requestParams.fileContent, requestParams.fileName)

    const req = {
        url: buildAPIUrl({methodName, args}),
        method: 'post',
        baseURL: this.config.baseURL,
        headers: { ... buildAuthHeader({config:this.config, methodName, args}), ... form.getHeaders() },
        data: form
    };

	let promise = new Promise((resolve, reject) => {

		this.makeRequest(req)
			.then(function(resData) {
				if (resData && resData.MediaID) {
					const m = {
						mediaID: resData.MediaID,
						url: resData.Url,
						size: resData.Size,
						contentType: resData.ContentType
					}
					resolve(m);
				} else {
					reject(new Error("The UploadMedia call did not return the expected value."))
				}
			})
			.catch(function(err) {
				reject(err);
			});

	});

	return promise;

}

function validateRequestParams(requestParams) {
    if(!requestParams.fileName) {
		throw new TypeError('You must include a fileName in your request params.')
	} else if(! requestParams.fileContent) {
		throw new TypeError('You must include a fileContent Blob object in your request params.');
	} else {
        return;
    }
}

export default uploadMedia;