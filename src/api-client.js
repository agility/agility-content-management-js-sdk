import axios from 'axios'
import { logError, logDebug } from './utils'
import apiLocation from './const/APILocation'

// import getSitemapFlat from './methods/getSitemapFlat'
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

	baseUrl: null,

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
    if (!config.baseUrl) {

		//use default url based on the location
		if (config.location === apiLocation.Canada) {
			config.baseUrl = defaultAPIURL.Canada
		} else {
			config.baseUrl = defaultAPIURL.USA
		}

		//add on the api base path
		config.baseUrl += "/Services/API.ashx/";

	}


    let adapter = null;

	//TODO: determine if we need an adapter for axios...


    //create apply the adapter to our axios instance
    const api = axios.create({
        adapter: adapter
    })


    //the function that actually makes ALL our requests
    function makeRequest(reqConfig) {

        if (config.debug) {
            logDebug(`AgilityCMS MGMT API LOG: ${reqConfig.baseURL}${reqConfig.url}`);
        }

        //make the request using our axios instance
        return api(reqConfig).then(async (response) => {

			let data = response.data;
			//TODO: do any post processing on the response that we might need here...
            return data;
        })
            .catch(async (error) => {
                logError(`AgilityCMS MGMT API ERROR: Request failed for ${reqConfig.baseURL}${reqConfig.url} ... ${error} ... Does the item exist?`)
            });
    }

    //export only these properties:
    return {
        config: config,
        makeRequest: makeRequest,

    }

}