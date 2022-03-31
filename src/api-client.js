import axios from 'axios'
import { logError, logDebug } from './utils'
import apiLocation from './const/APILocation'

import saveContentItem 	from './methods/content/saveContentItem'
import requestApproval 	from './methods/content/requestApproval'
import approveContent 	from './methods/content/approveContent'
import declineContent 	from './methods/content/declineContent'
import deleteContent 	from './methods/content/deleteContent'
import publishContent 	from './methods/content/publishContent'
import unpublishContent from './methods/content/unpublishContent'
import getContentItem from './methods/content/getContentItem'

import uploadMedia 		from './methods/media/uploadMedia'
import getMediaID from './methods/media/getMediaID'

import saveUrlRedirection from './methods/urlRedirections/saveUrlRedirection'
import deleteUrlRedirection from './methods/urlRedirections/deleteUrlRedirection'
import saveUrlRedirectionTest from './methods/urlRedirections/saveUrlRedirectionTest'

import saveWebHook from "./methods/webHooks/saveWebHook"
import deleteWebHook from "./methods/webHooks/deleteWebHook"

const defaultConfig = {
	location: apiLocation.USA,

	baseURL: null,

	//legacy setup
	websiteName: null,
	securityKey: null,

	//future-proof for when we allow for api keys
    guid: null,
	apiKey: null,

	debug: false
};

export default function createClient(userConfig) {

    //merge our config - user values will override our defaults
    let config = {
        ...defaultConfig,
        ...userConfig
    };

	const defaultAPIURL  = {
		"USA" : "https://contentserver1503.agilitycms.com",
		"Canada": "https://contentserver-ca.agilitycms.com",
		"Europe": "https://contentserver-eu.agilitycms.com",
		"DEV": "https://dev-contentserver.publishwithagility.com"
	}


    //compute the base Url
    if (!config.baseURL) {

		//use default url based on the location
		if (config.location === apiLocation.Canada) {
			config.baseURL = defaultAPIURL.Canada
		} else if (config.location === apiLocation.Europe) {
			config.baseURL = defaultAPIURL.Europe
		} else if (config.location === apiLocation.DEV) {
			config.baseURL = defaultAPIURL.DEV
		} else {
			config.baseURL = defaultAPIURL.USA
		}
	}

	//add on the api base path
	config.baseURL += "/Services/API.ashx/";


    //create apply the adapter to our axios instance
    const api = axios.create()

    //the function that actually makes ALL our requests
    function makeRequest(reqConfig) {

        if (reqConfig.debug  || api.debug) {
            logDebug(`AgilityCMS MGMT API LOG: ${reqConfig.baseURL}${reqConfig.url}`);
		}

		let promise = new Promise(function(resolve, reject) {

			api(reqConfig).then((response) => {

				if (! response || ! response.data) {
					reject("The Management API request did not return a usable response.")
				}

				let data = response.data;
				//TODO: do any post processing on the response that we might need here...

				if (data.IsError === true) {
					let msg = data.Message !== null ? data.Message : "The Management API request failed with no error message."
					reject(new Error(msg));

				} else {

					resolve(data.ResponseData);
				}
			})
			.catch((error) => {

				logError(`AgilityCMS MGMT API ERROR: Request failed for ${reqConfig.baseURL}${reqConfig.url} ... ${error}`)
				reject(new Error("The Management API request failed."))
			});

		});

		return promise;
    }

    //export only these properties:
    return {
        config,
        makeRequest,
		getContentItem,
		saveContentItem,
		requestApproval,
		approveContent,
		declineContent,
		deleteContent,
		publishContent,
		unpublishContent,

		uploadMedia,
		getMediaID,

		saveUrlRedirection,
		deleteUrlRedirection,
		saveUrlRedirectionTest,

		saveWebHook,
		deleteWebHook

    }

}