import axios from 'axios'
import { logError, logDebug } from './utils'
import apiLocation from './const/APILocation'

import saveContentItem from './methods/content/saveContentItem'

// import getSitemapNested from './methods/getSitemapNested'
// import getContentItem from './methods/getContentItem'
// import getContentList from './methods/getContentList'
// import getPage from './methods/getPage'
// import getGallery from './methods/getGallery'
// import getSyncContent from './methods/getSyncContent'
// import getSyncPages from './methods/getSyncPages'
// import FilterOperators from './types/FilterOperator'
// import FilterLogicOperators from './types/FilterLogicOperator'
//import SortDirections from './types/SortDirection'

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
		"Canada": "https://contentserver-ca.agilitycms.com"
	}


    //compute the base Url
    if (!config.baseURL) {

		//use default url based on the location
		if (config.location === apiLocation.Canada) {
			config.baseURL = defaultAPIURL.Canada
		} else {
			config.baseURL = defaultAPIURL.USA
		}
	}

	//add on the api base path
	config.baseURL += "/Services/API.ashx/";

	//TODO: determine if we need an adapter for axios...
    let adapter = null;

    //create apply the adapter to our axios instance
    const api = axios.create({
        adapter: adapter
    })

    //the function that actually makes ALL our requests
    function makeRequest(reqConfig) {

console.log("MAKE REQUEST", reqConfig)

        if (reqConfig.debug) {
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
				reject("The Management API request failed.")
			});

		});


		return promise;


        // //make the request using our axios instance
        // return api(reqConfig).then(async (response) => {

		// 	let data = response.data;
		// 	//TODO: do any post processing on the response that we might need here...

        //     return data;
        // })
		// .catch(async (error) => {

		// 	logError(`AgilityCMS MGMT API ERROR: Request failed for ${reqConfig.baseURL}${reqConfig.url} ... ${error} ... Does the item exist?`)
		// });
    }

    //export only these properties:
    return {
        config: config,
        makeRequest: makeRequest,
		saveContentItem: saveContentItem
    }

}